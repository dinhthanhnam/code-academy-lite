<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseClassResource;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\UserResource;
use App\Models\CourseClass;
use App\Models\Exercise;
use Exception;
use Illuminate\Http\Request;
use Nette\Schema\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class CourseClassController extends Controller
{
    // Lấy thông tin lớp học
    public function course_class_detail(Request $request, string $slug)
    {
        try {
            // Get the authenticated user
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'message' => 'Unauthenticated',
                    'success' => false
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Check if the course class exists in user's related course_classes
            $course_class = $user->course_class()
                ->where('slug', $slug)
                ->first();

            if (!$course_class) {
                return response()->json([
                    'message' => 'Không tìm thấy lớp hoặc bạn không có quyền truy cập',
                    'success' => false
                ], Response::HTTP_NOT_FOUND);
            }

            return new CourseClassResource($course_class);

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'success' => false
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function course_class_exercises(string $slug) {
        try {
            if ($slug == "irregular"){
                $exercises = Exercise::where('is_free', 1)
                    ->with(['topics', 'language'])
                    ->paginate(15);
            }
            else{
                $course_class = CourseClass::where('slug', $slug)->first();

                if (!$course_class) {
                    return response()->json([
                        'message' => 'Không tìm thấy lớp',
                        'success' => false
                    ], Response::HTTP_NOT_FOUND);
                }

                $exercises = $course_class->exercises()
                    ->with(['topics', 'language'])
                    ->paginate(15);
            }

            return ExerciseResource::collection($exercises);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'success' => false
            ], Response::HTTP_BAD_REQUEST);
        }
    }


    // Lấy danh sách sinh viên
    public function course_class_students(string $slug) {
        try {
            $course_class = CourseClass::where('slug', $slug)->first();

            if (!$course_class) {
                return response()->json([
                    'message' => 'Không tìm thấy lớp',
                    'success' => false
                ], Response::HTTP_NOT_FOUND);
            }

            return UserResource::collection($course_class->students()->paginate(8));
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'success' => false
            ], Response::HTTP_BAD_REQUEST);
        }
    }
    public function joinClass(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthenticated',
                    'success' => false,
                ], Response::HTTP_UNAUTHORIZED);
            }

            $validated = $request->validate([
                'class_code' => 'required|string', // Đổi từ 'join_code' sang 'class_code'
            ]);

            $courseClass = CourseClass::where('course_class_join_code', $validated['class_code'])->first();
            if (!$courseClass) {
                return response()->json([
                    'message' => "Không tìm thấy lớp học phần với mã tham gia: {$validated['class_code']}",
                    'success' => false,
                ], Response::HTTP_NOT_FOUND);
            }

            if ($courseClass->attendants()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    'message' => 'Bạn đã tham gia lớp học phần này rồi',
                    'success' => false,
                ], Response::HTTP_CONFLICT);
            }

            $courseClass->attendants()->attach($user->id, ['role' => 'student']);

            return response()->json([
                'message' => 'Tham gia lớp học phần thành công',
                'success' => true,
                'data' => new CourseClassResource($courseClass),
            ], Response::HTTP_OK);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'success' => false,
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi: ' . $e->getMessage(),
                'success' => false,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
