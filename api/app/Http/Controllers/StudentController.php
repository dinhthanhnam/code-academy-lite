<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Str;

class StudentController extends Controller
{
    public function personal_course_classes(Request $request): JsonResponse
    {
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Cút ra ngoài!'
            ], 401); // Thêm status code 401 cho không xác thực
        }

        // Giả định course_class() là quan hệ hasMany hoặc belongsToMany
        $courses = $request->user()->course_class()->get();

        // Nếu cần định dạng lại dữ liệu
        $formatted_courses = $courses->map(function ($course) {
            return [
                'id' => Str::uuid()->toString(),
                'name' => $course->name,
                'path' => "/" . $course->slug,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu thành công!',
            'personal_course_classes' => $formatted_courses
        ]);
    }
}
