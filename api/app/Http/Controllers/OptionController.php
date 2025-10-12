<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseClass;
use App\Models\Option;
use App\Models\RegularClass;
use App\Models\User;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function regular_class(Request $request)
    {
        $regular_classes = RegularClass::query();

        $query = $request->input('search');
        if ($query) {
            $regular_classes->where('class_code', 'like', "%{$query}%");
        }

        $regular_class_options = $regular_classes->get()->map(function ($class) {
            return new Option($class->id, $class->class_code);
        });
        return response()->json($regular_class_options);
    }

    public function course(Request $request)
    {
        $courses = Course::query();

        $query = $request->input('search');
        if ($query) {
            $courses->where('course_code', 'like', "%{$query}%");
        }

        $course_options = $courses->get()->map(function ($course) {
            return new Option($course->id, $course->course_code);
        });
        return response()->json($course_options);
    }

    public function course_class(Request $request)
    {
        $course_classes = CourseClass::query();

        $query = $request->input('search');
        if ($query) {
            $course_classes->where('course_code', 'like', "%{$query}%");
        }

        $course_class_options = $course_classes->get()->map(function ($course) {
            return new Option($course->id, $course->course_class_code);
        });
        return response()->json($course_class_options);
    }

    public function lecturer(Request $request)
    {
        $lecturers = User::where('role', 'lecturer');

        $query = $request->input('search');
        if ($query) {
            $lecturers->where('email', 'like', "%{$query}%")
            ->orWhere('name', 'like', "%{$query}%");
        }

        $lecturer_options = $lecturers->get()->map(function ($lecturer) {
            return new Option($lecturer->id, $lecturer->name);
        });
        return response()->json($lecturer_options);
    }
}
