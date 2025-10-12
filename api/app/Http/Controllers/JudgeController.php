<?php

namespace App\Http\Controllers;

use App\Models\CourseExercise;
use App\Models\Exercise;
use App\Models\Submission;
use HttpException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class JudgeController extends Controller
{
    /**
     * @throws ConnectionException
     * @throws HttpException
     */
    public function submit(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'course_class_id' => 'required|integer',
            'exercise_id' => 'required|integer',
            'mode' => 'required|string|in:compile,submit',
        ]);

        $courseClassId = $request->input('course_class_id');
        $exerciseId = $request->input('exercise_id');
        $sourceCode = $request->input('code');
        $mode = $request->input('mode');

        // Validate course exercise and related data
        $courseExercise = CourseExercise::where('course_class_id', $courseClassId)
            ->where('exercise_id', $exerciseId)
            ->first();

//        if (!$courseExercise) {
//            return response()->json(['success' => false, 'message' => 'Không tìm thấy bài tập'], 404);
//        }

        if ($mode === 'submit' && !$courseExercise->is_active) {
            return response()->json(['success' => false, 'message' => 'Bài tập đã đóng'], 403);
        }

        $exercise = Exercise::find($exerciseId);
        if (!$exercise) {
            return response()->json(['success' => false, 'message' => 'Không tìm thấy bài tập'], 404);
        }

        $language = $exercise->language()->first();
//        if (!$language) {
//            return response()->json(['success' => false, 'message' => 'Ngôn ngữ không hợp lệ'], 400);
//        }

        $testCases = $exercise->test_cases;
        if (empty($testCases)) {
            return response()->json(['success' => false, 'message' => 'Không có test case'], 400);
        }

        // Process each test case
        $judgedResults = [];
        foreach ($testCases as $test) {
            $submissionData = [
                'source_code'    => $sourceCode,
                'language_id'    => $language ? $language->judge_language_id : 2,
//                'language_id'    => 2,
                'stdin'          => $test['stdin'],
                'expected_output'=> $test['expected_output'],
                'cpu_time_limit' => $exercise->time_limit,
                'memory_limit'   => $exercise->memory_limit * 1024,
            ];

            $response = Http::post(env('JUDGE_HOST') . '/submissions?base64_encoded=false&wait=true', $submissionData);

            if (!$response->successful()) {
                \Log::error('Judge0 submission failed:', [$response->body()]);
                throw new HttpException(502, 'Không thể kết nối tới Judge0');
            }

            $judgedResults[] = $response->json();
        }

        // Process results
        $allPassed = true;
        $totalTime = 0;
        $totalMemory = 0;
        $results = [];

        foreach ($judgedResults as $index => $res) {
            $statusId = $res['status']['id'] ?? 0;
            $result = [
                'status' => $res['status']['description'] ?? 'Unknown',
                'error' => $res['status']['id'] !== 3 ? ($res['stderr'] ?? $res['compile_output'] ?? null) : null,
                'time' => $res['time'] ?? 0,
                'memory' => $res['memory'] ?? 0,
            ];

            $results[] = $result;

            $totalTime += $result['time'];
            $totalMemory += $result['memory'];

            if ($statusId !== 3) { // 3 = Accepted
                $allPassed = false;
            }
        }

        $message = $allPassed
            ? 'Tất cả test đều đúng'
            : 'Một số test bị sai';

        // Only save to database if mode is 'submit'
        $submissionId = null;

        if ($mode === 'submit') {
            $submission = Submission::create([
                'user_id'         => \Auth::id(),
                'exercise_id'     => $exerciseId,
                'course_class_id' => $courseClassId,
                'source_code'     => $sourceCode,
                'language'        => $language->name,
                'status'          => $allPassed ? 'accepted' : 'failed',
                'execution_time'  => round($totalTime, 3),
                'memory_used'     => (int) $totalMemory,
                'output'          => json_encode($results),
            ]);

            $submissionId = $submission->id;
            $message = 'Nộp bài thành công, ' . $message;
        } else {
            $message = 'Biên dịch thành công, ' . $message;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'submission_id' => $submissionId,
            'results' => $results,
        ]);
    }
}
