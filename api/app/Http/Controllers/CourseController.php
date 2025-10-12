<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseClassResource;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CourseController extends Controller
{
    public function get_course_classes_by_course_id(Request $request) {
        if(!$request->has('course_id')) {
            return response()->json([
                'message' => 'Không tìm được khoá học',
                'success' => false
            ], Response::HTTP_NOT_FOUND);
        }

        $course_id = $request->input('course_id');

        // Lấy danh sách lớp học
        $course_classes = Course::find($course_id)->course_classes();

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

    public function get_select_option (Request $request) {
        $course_classes = Course::query();
        // Nếu có tham số tìm kiếm, áp dụng điều kiện
        if ($request->has('search')) {
            $search = $request->input('search');
            $course_classes->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('course_class_code', 'like', "%$search%");
            });
        }
        return CourseResource::collection($course_classes->paginate(8));
    }
}
