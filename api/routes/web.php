<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\CourseClassController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CRUDController\CourseController as CourseCRUDController;
use App\Http\Controllers\CRUDController\CourseClassController as CourseClassCRUDController;
use App\Http\Controllers\CRUDController\LecturerController as LecturerCRUDController;
use App\Http\Controllers\CRUDController\SubmissionController as SubmissionCRUDController;
use App\Http\Controllers\CRUDController\UserController as UserCRUDController;
use App\Http\Controllers\CRUDController\ExerciseController as ExerciseCRUDController;
use App\Http\Controllers\JudgeController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/broadcasting/auth', function (Illuminate\Http\Request $request) {
    return Broadcast::auth($request);
})->middleware(['auth']);

Route::post('/login', [AuthController::class, "login"]);
Route::post('/register', [AuthController::class, "register"]);
Route::post('/logout', [AuthController::class, "logout"])
    ->middleware('auth');
Route::post('/join-class', [CourseClassController::class, 'joinClass']);

Route::get('/auth/check', function (Request $request) {
    if (Auth::check()) {
        return response()->json([
            'authenticated' => true,
        ]);
    }

    return response()->json([
        'authenticated' => false
    ], 401);
})->middleware('web');

Route::group(['prefix' => 'api'], function () {
    Route::post('/submit', [JudgeController::class, 'submit']);
    Route::get('/personal_role', [AuthController::class, 'personal_role']);
    Route::get('/personal_info', [AuthController::class, 'personal_info']);
    Route::get('/personal_course_classes', [StudentController::class, 'personal_course_classes']);
    Route::get('/lecturer_course_classes', [LecturerController::class, 'lecturer_course_classes']);
    Route::get('/lecturer/course-classes', [LecturerController::class, 'get_course_classes_for_particular_lecturer']);
    Route::get('/course-class/{slug}/detail', [CourseClassController::class, 'course_class_detail']);
    Route::get('/course-class/{slug}/exercises', [CourseClassController::class, 'course_class_exercises']);
    Route::get('/course-class/{slug}/students', [CourseClassController::class, 'course_class_students'])->middleware('admin');
    Route::get('/personal_conversations', [ConversationController::class, 'personalCourseClasses']);
    Route::get('/conversations/{conversationId}/messages', [MessageController::class, 'index']);
    Route::post('/conversations/{conversationId}/messages', [MessageController::class, 'store']);
});

Route::group(['prefix' => 'admin', 'middleware' => 'admin'], function () {
    Route::apiResource('course', CourseCRUDController::class);
    Route::apiResource('course-class', CourseClassCRUDController::class);
    Route::apiResource('lecturer', LecturerCRUDController::class);
    Route::apiResource('user', UserCRUDController::class);
    Route::apiResource('exercise', ExerciseCRUDController::class);
    Route::apiResource('submission', SubmissionCRUDController::class);
});

Route::group(['prefix' => 'course' , 'middleware' => 'admin'], function () {
    Route::get('course-classes', [CourseController::class, 'get_course_classes_by_course_id']);
});

Route::group(['prefix' => 'lecturer', 'middleware' => 'admin'], function () {
    Route::post('/create-exercise', [LecturerController::class, 'lecturer_create_course_class_exercise']);
    Route::get('/course-classes', [LecturerController::class, 'get_course_classes_by_lecturer']);
    Route::post('/assign-course', [LecturerController::class, 'assign_course_class_to_lecturer']);
    Route::post('/detach-course', [LecturerController::class, 'detach_course_class_from_lecturer']);
});

Route:: group(['prefix' => 'course-class', 'middleware' => 'admin'], function () {

});

Route::group(['prefix' => 'option'], function () {
    Route::get('/regular-class', [OptionController::class, 'regular_class']);
    Route::get('/course', [OptionController::class, 'course']);
    Route::get('/course-class', [OptionController::class, 'course_class']);
    Route::get('/lecturer', [OptionController::class, 'lecturer']);
});
