<?php

namespace App\Http\Controllers\CRUDController;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'exercise_id' => 'required|integer',
            'course_class_id' => 'required|integer',
        ]);

        $exerciseId = $request->input('exercise_id');
        $courseClassId = $request->input('course_class_id');

        $submissions = Submission::where('exercise_id', $exerciseId)
            ->where('course_class_id', $courseClassId)
            ->with('user') // Eager load user relationship
            ->get([
                'id',
                'user_id',
                'exercise_id',
                'course_class_id',
                'source_code',
                'language',
                'status',
                'execution_time',
                'memory_used',
                'output',
                'created_at',
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Lấy danh sách bài nộp thành công',
            'submissions' => $submissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
