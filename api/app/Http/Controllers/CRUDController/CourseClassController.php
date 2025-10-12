<?php

namespace App\Http\Controllers\CRUDController;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseClassResource;
use App\Models\Course;
use App\Models\CourseClass;
use App\Models\RegularClass;
use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class CourseClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = CourseClass::query()->with(['lecturer']);

        // Nếu có search query, thêm điều kiện tìm kiếm
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('course_class_code', 'like', "%$search%");
            });
        }
        return CourseClassResource::collection($query->paginate(8));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|max:255|exists:courses,id',
            'assigned_regular_class_id' => 'required|exists:regular_classes,id',
            'start_date' => 'required',
            'description' => 'required',
        ]);

        $standardized_date = $validated['start_date'] = Carbon::parse($request->input('start_date'))->format('Y-m-d H:i:s');

        $course = Course::findOrFail($validated['course_id']);
        $course_code = $course->course_code;

        $regular_class = RegularClass::findOrFail($validated['assigned_regular_class_id']);
        $regular_class_code = $regular_class->class_code;

        $existing_classes_count = CourseClass::where('course_id', $validated['course_id'])->count();
        $course_class_code = $course_code . str_pad($existing_classes_count + 1, 2, '0', STR_PAD_LEFT);

        $name = "{$regular_class_code} - {$course_code}";

        $slug = Str::slug(substr($regular_class_code, 0, 3) . '-' . $course_class_code);

        $course_class = CourseClass::create([
            'active' => true,
            'course_id' => $validated['course_id'],
            'assigned_regular_class_id' => $validated['assigned_regular_class_id'],
            'description' => $validated['description'],
            'start_date' => $standardized_date,
            'course_class_code' => $course_class_code,
            'name' => $name,
            'slug' => $slug,
        ]);

        $lecturer = User::find($request->input('lecturer_id'));
        if($lecturer) {
            $course_class->attendants()->sync([$lecturer->id => ['role' => 'lecturer']]);
        }

        return response()->json([
            'message' => 'Tạo lớp học phần thành công',
            'success' => true,
            'data' => new CourseClassResource($course_class),
        ], Response::HTTP_OK);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $course = CourseClass::findOrFail($id);
            return new CourseClassResource($course);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Không tìm thấy lớp học phần'], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $course_class = CourseClass::findOrFail($id);

            $validated = $request->validate([
                'course_class_code' => 'sometimes|string|max:255|unique:course_classes,course_class_code,' . $id,
                'name' => 'sometimes|string|max:255',
                'course_class_join_code' => 'sometimes|string|max:255',
                'description' => 'sometimes|string|max:255',
                'start_date' => 'sometimes',
                'active' => 'boolean',
            ]);

            // Chuẩn hóa start_date nếu có trong request
            if ($request->has('start_date')) {
                $validated['start_date'] = Carbon::parse($request->input('start_date'))->format('Y-m-d H:i:s');
            }

            $lecturer = User::find($request->input('lecturer_id'));
            if($lecturer) {
                $course_class->attendants()->sync([$lecturer->id => ['role' => 'lecturer']]);
            }

            $course_class->update($validated);

            return response()->json([
                'message' => 'Cập nhật lớp học phần thành công',
                'success' => true,
                'data' => new CourseClassResource($course_class->fresh()), // Lấy dữ liệu mới nhất
            ], Response::HTTP_OK);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy lớp học phần',
                'success' => false,
            ], Response::HTTP_NOT_FOUND);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'success' => false,
                'errors' => $e->errors(), // Trả về chi tiết lỗi validation
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        {
            try {
                $course_class = CourseClass::findOrFail($id);
                $course_class->delete();
                return response()->json(['message' => 'Xoá lớp học phần thành công', 'success' => true]);
            } catch (ModelNotFoundException $e) {
                return response()->json(['message' => 'Không tìm thấy lớp học phần', 'success' => false], Response::HTTP_NOT_FOUND);
            } catch (QueryException $e) {
                if ($e->getCode() === '23000') {
                    return response()->json([
                        'message' => 'Không thể xóa lớp học phần vì còn liên kết với dữ liệu khác (sinh viên/giảng viên)',
                        'success' => false
                    ], Response::HTTP_CONFLICT);
                }

                return response()->json([
                    'message' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage(),
                    'success' => false
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }
}
