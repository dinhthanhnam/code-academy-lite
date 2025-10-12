<?php

namespace App\Http\Controllers\CRUDController;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Course::query();

        // Nếu có search query, thêm điều kiện tìm kiếm
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('course_code', 'like', "%$search%");
            });
        }
        return CourseResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'course_code' => 'required|string|max:255|unique:courses',
                'name' => 'required|string|max:255',
            ]);

            $course = Course::create($validated);
            return response()->json([
                'message' => 'Tạo học phần thành công!',
                'success' => true,
                'data' => new CourseResource($course)
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Tạo học phần thất bại!',
                'success' => false,
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $course = Course::findOrFail($id);
            return new CourseResource($course);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy học phần',
                'success' => false,
                ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $course = Course::findOrFail($id);
            $validated = $request->validate([
                'course_code' => 'sometimes|string|max:255|unique:courses,course_code,' . $id,
                'name' => 'sometimes|string|max:255',
            ]);

            $course->update($validated);
            return response()->json([
                'message' => 'Cập nhật khoá học thành công.',
                'success' => true,
                'data' => new CourseResource($course)
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy học phần',
                'success' => false,
            ], Response::HTTP_NOT_FOUND);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Không tìm thấy học phần',
                'success' => false,
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $course = Course::findOrFail($id);
            $course->delete();
            return response()->json(['message' => 'Xoá học phần thành công', 'success' => true]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Không tìm thấy học phần', 'success' => false], Response::HTTP_NOT_FOUND);
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return response()->json([
                    'message' => 'Không thể xóa học phần vì còn liên kết với dữ liệu khác (ví dụ: lớp học, bài tập)',
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
