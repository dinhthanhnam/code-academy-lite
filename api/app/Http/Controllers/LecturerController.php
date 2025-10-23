<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseClassResource;
use App\Models\CourseClass;
use App\Models\CourseExercise;
use App\Models\Exercise;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Str;
use Symfony\Component\HttpFoundation\Response;

class LecturerController extends Controller
{
    public function lecturer_course_classes(Request $request)
    {
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Cút ra ngoài!'
            ], 401);
        }

        $user = $request->user();

        $course_classes = $user->course_class()->get();

        $regular_class = $user->regular_class;

        $formatted_course_classes = $course_classes->map(function ($course) {
            return [
                'id' => Str::uuid()->toString(),
                'name' => $course->name,
                'type' => 'course_class', // Đánh dấu là loại course_class
                'path' => "/" . $course->slug,
            ];
        });

        // Format regular_class (nếu có)
        $formatted_regular_class = $regular_class ? [[
            'id' => Str::uuid()->toString(),
            'name' => $regular_class->name,
            'type' => 'regular_class',
            'path' => "/regular/" . $regular_class->id,
        ]] : [];

        // Gộp dữ liệu từ cả hai nguồn
        $formatted_classes = array_merge($formatted_course_classes->toArray(), $formatted_regular_class);

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu thành công!',
            'lecturer_course_classes' => $formatted_classes
        ]);
    }
    public function get_course_classes_for_particular_lecturer(Request $request)
    {

        $lecturer = $request->user();

        $course_classes = $lecturer->course_class();

        if ($request->has('search')) {
            $search = $request->input('search');
            $course_classes->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('course_class_code', 'like', "%$search%");
            });
        }
        // Trả về danh sách lớp học theo pagination
        return CourseClassResource::collection($course_classes->paginate(8));
    }
    public function get_course_classes_by_lecturer(Request $request)
    {
        if(!$request->has('lecturer_id')) {
            return response()->json([
                'message' => 'Không tìm được giảng viên',
                'success' => false
            ], Response::HTTP_NOT_FOUND);
        }

        $lecturer_id = $request->input('lecturer_id');

        $lecturer = User::findOrFail($lecturer_id);

        $course_classes = $lecturer->course_class();

        // Nếu có tham số tìm kiếm, áp dụng điều kiện
        if ($request->has('search')) {
            $search = $request->input('search');
            $course_classes->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('course_class_code', 'like', "%$search%");
            });
        }
        // Trả về danh sách lớp học theo pagination
        return CourseClassResource::collection($course_classes->paginate(8));
    }

    public function assign_course_class_to_lecturer(Request $request) {
        try {
            $lecturer = User::findOrFail($request->input('lecturer_id'));

            // Gán lớp học với role vào bảng pivot
            $lecturer->course_class()->syncWithoutDetaching([
                $request->input('course_class_id') => ['role' => $lecturer->role]
            ]);

            return response()->json([
                'message' => 'Gán lớp cho giảng viên thành công',
                'success' => true
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Không thể gán lớp này cho giảng viên',
                'success' => false
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function detach_course_class_from_lecturer(Request $request) {
        try {
            $lecturer_id = $request->input('lecturer_id');
            $course_class_id = $request->input('course_class_id');

            $lecturer = User::findOrFail($lecturer_id);

            // Kiểm tra xem có bản ghi trong bảng pivot không
            if ($lecturer->course_class()->where('course_class_id', $course_class_id)->exists()) {
                // Gỡ bỏ mối quan hệ và xóa bản ghi pivot
                $lecturer->course_class()->detach($course_class_id);
            }

            return response()->json([
                'message' => 'Xoá lớp của giảng viên thành công',
                'success' => true
            ], Response::HTTP_OK);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Không thể xoá lớp của giảng viên',
                'success' => false
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function lecturer_create_course_class_exercise(Request $request)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'level' => 'sometimes|in:basic,intermediate,advanced,exam',
            'example_input' => 'nullable|string',
            'example_output' => 'sometimes|string',
            'test_cases' => 'sometimes|array',
            'time_limit' => 'sometimes|integer',
            'memory_limit' => 'sometimes|integer',
            'is_free' => 'boolean',
            'is_active' => 'boolean',
            'is_test' => 'boolean',
            'course_class_id' => 'sometimes|exists:course_classes,id',
            'week_number' => 'sometimes|integer',
            'deadline' => 'sometimes|date',
            'is_hard_deadline' => 'boolean'
        ]);
        try {
            // Tạo bài tập
            $exercise = Exercise::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'level' => $validated['level'],
                'example_input' => $validated['example_input'] ?? null,
                'example_output' => $validated['example_output'],
                'test_cases' => json_encode($validated['test_cases'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                'is_free' => $validated['is_free'] ?? false,
                'time_limit' => $validated['time_limit'],
                'memory_limit' => $validated['memory_limit'],
            ]);

            // Gán bài tập vào lớp học
            CourseExercise::create([
                'week_number' => $validated['week_number'],
                'deadline' => $validated['deadline'],
                'is_hard_deadline' => $validated['is_hard_deadline'] ?? false,
                'is_active' => $validated['is_active'],
                'is_test' => $validated['is_test'],
                'course_class_id' => $validated['course_class_id'],
                'exercise_id' => $exercise->id,
            ]);
            return response()->json([
                'message' => 'Exercise created and assigned successfully.',
                'success' => true,
                'exercise' => $exercise
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error' .$e,
                'success' => false,
            ]);
        }
    }

    public function lecturer_update_course_class_exercise(Request $request, int $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'level' => 'sometimes|in:basic,intermediate,advanced,exam',
            'example_input' => 'sometimes|nullable|string',
            'example_output' => 'sometimes|nullable|string',
            'test_cases' => 'sometimes|array',
            'time_limit' => 'sometimes|integer',
            'memory_limit' => 'sometimes|integer',
            'is_free' => 'sometimes|boolean',
            'is_active' => 'sometimes|boolean',
            'is_test' => 'sometimes|boolean',
            'course_class_id' => 'exists:course_classes,id',
            'week_number' => 'sometimes|integer',
            'deadline' => 'sometimes|date',
            'is_hard_deadline' => 'sometimes|boolean',
        ]);

        try {
            DB::beginTransaction();

            // Tìm exercise cần update
            $exercise = Exercise::findOrFail($id);

            // Cập nhật exercise
            $exercise->update([
                'title' => $validated['title'] ?? $exercise->title,
                'description' => $validated['description'] ?? $exercise->description,
                'level' => $validated['level'] ?? $exercise->level,
                'example_input' => $validated['example_input'] ?? $exercise->example_input,
                'example_output' => $validated['example_output'] ?? $exercise->example_output,
                'test_cases' => isset($validated['test_cases'])
                    ? json_encode($validated['test_cases'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
                    : $exercise->test_cases,
                'is_free' => $validated['is_free'] ?? $exercise->is_free,
                'time_limit' => $validated['time_limit'] ?? $exercise->time_limit,
                'memory_limit' => $validated['memory_limit'] ?? $exercise->memory_limit,
            ]);

            // Nếu có dữ liệu gán lớp học thì cập nhật hoặc tạo mới CourseExercise
            if (isset($validated['course_class_id'])) {
                CourseExercise::updateOrCreate(
                    [
                        'exercise_id' => $exercise->id,
                        'course_class_id' => $validated['course_class_id'],
                    ],
                    [
                        'week_number' => $validated['week_number'] ?? null,
                        'deadline' => $validated['deadline'] ?? null,
                        'is_hard_deadline' => $validated['is_hard_deadline'] ?? false,
                        'is_active' => $validated['is_active'] ?? true,
                        'is_test' => $validated['is_test'] ?? false,
                    ]
                );
            }

            DB::commit();

            return response()->json([
                'message' => 'Exercise updated successfully.',
                'success' => true,
                'exercise' => $exercise,
            ]);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error: ' . $e->getMessage(),
                'success' => false,
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function lecturer_delete_course_class_exercise(Request $request, int $id)
    {
        try {
            DB::beginTransaction();

            // Tìm exercise
            $exercise = Exercise::findOrFail($id);

            // Xóa các bản ghi liên kết trong course_exercises (nếu có)
            CourseExercise::where('exercise_id', $exercise->id)->delete();

            // Xóa exercise chính
            $exercise->delete();

            DB::commit();

            return response()->json([
                'message' => 'Exercise deleted successfully.',
                'success' => true,
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Exercise not found.',
                'success' => false,
            ], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error: ' . $e->getMessage(),
                'success' => false,
            ], Response::HTTP_BAD_REQUEST);
        }
    }

}
