<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Submission;
use App\Models\User;
use DB;
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
            ], 401);
        }

        $courses = $request->user()->course_class()->get();

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
    
    public function personal_undone_exercises(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Cút ra ngoài!'
            ], 401);
        }

        $courseClassIds = DB::table('course_attendant')
            ->where('user_id', $user->id)
            ->pluck('course_class_id');

        if ($courseClassIds->isEmpty()) {
            return response()->json(['success' => true, 'data' => []]);
        }

        $submittedExerciseIds = DB::table('submissions')
            ->where('user_id', $user->id)
            ->whereIn('course_class_id', $courseClassIds)
            ->pluck('exercise_id')
            ->unique();

       $undoneExercises = DB::table('exercises')
        ->join('course_exercise', 'exercises.id', '=', 'course_exercise.exercise_id')
        ->join('course_classes', 'course_exercise.course_class_id', '=', 'course_classes.id')
        ->whereIn('course_classes.id', $courseClassIds)
        ->where('course_exercise.is_active', true)
        ->when($submittedExerciseIds->isNotEmpty(), function ($q) use ($submittedExerciseIds) {
            $q->whereNotIn('exercises.id', $submittedExerciseIds);
        })
        ->select([
            'exercises.id',
            'exercises.title',
            'exercises.level',
            'course_exercise.week_number',
            'course_classes.slug as course_class_slug',
            'course_classes.name as course_class_name',
            'course_classes.start_date',
        ])
        ->get()
        ->map(function ($exercise) {
            // ✅ Tính deadline = start_date + (week_number - 1) * 7 ngày
            if ($exercise->start_date) {
                $exercise->deadline = \Carbon\Carbon::parse($exercise->start_date)
                    ->addWeeks(max(0, (int)$exercise->week_number - 1))
                    ->toDateString();
            } else {
                $exercise->deadline = null;
            }

            // ✅ Lấy topic names
            $exercise->topics = DB::table('exercise_topic')
                ->join('topics', 'exercise_topic.topic_id', '=', 'topics.id')
                ->where('exercise_topic.exercise_id', $exercise->id)
                ->pluck('topics.name');

            unset($exercise->start_date); // bỏ cho gọn nếu muốn
            return $exercise;
        });

        // ✅ luôn luôn return
        return response()->json([
            'success' => true,
            'data' => $undoneExercises,
        ]);
    }


}
