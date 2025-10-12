<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Course;
use App\Models\CourseClass;
use Carbon\Carbon;

class CourseExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy tất cả course từ bảng courses
        $courses = Course::all();

        if ($courses->isEmpty()) {
            echo "Không tìm thấy khóa học nào để seed.\n";
            return;
        }

        // Danh sách phân công bài tập cho các khóa học
        $exerciseAssignments = [
            // Basic exercises (9 bài) - Chủ yếu cho Course 1: Cơ sở lập trình
            [
                'exercise_id' => 1, // Tính hiệu hai số
                'course_ids' => [1,2,3,4,5],
                'week_number' => 1,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 10, 23, 59, 59),
            ],
            [
                'exercise_id' => 2, // Tính tích hai số
                'course_ids' => [1,2,3,4,5],
                'week_number' => 1,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 12, 23, 59, 59),
            ],
            [
                'exercise_id' => 3, // Chia lấy nguyên
                'course_ids' => [1,2,3,4,5],
                'week_number' => 2,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 17, 23, 59, 59),
            ],
            [
                'exercise_id' => 4, // Kiểm tra số âm
                'course_ids' => [1,2,3,4,5],
                'week_number' => 2,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 19, 23, 59, 59),
            ],
            [
                'exercise_id' => 5, // Tổng các chữ số
                'course_ids' => [1,2,3,4,5],
                'week_number' => 3,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 24, 23, 59, 59),
            ],
            [
                'exercise_id' => 6, // Đếm số chữ số
                'course_ids' => [1,2,3,4,5],
                'week_number' => 3,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 26, 23, 59, 59),
            ],
            [
                'exercise_id' => 7, // Tính giai thừa
                'course_ids' => [1,2,3,4,5],
                'week_number' => 4,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 1, 23, 59, 59),
            ],
            [
                'exercise_id' => 8, // Tổng dãy số
                'course_ids' => [1,2,3,4,5],
                'week_number' => 4,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 3, 23, 59, 59),
            ],
            [
                'exercise_id' => 9, // Tìm số nhỏ nhất
                'course_ids' => [1,2,3,4,5],
                'week_number' => 5,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 8, 23, 59, 59),
            ],

            // Intermediate exercises (10 bài) - Chủ yếu cho Course 2: Lập trình nâng cao với C++
            [
                'exercise_id' => 10, // Kiểm tra tam giác
                'course_ids' => [2],
                'week_number' => 1,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 10, 23, 59, 59),
            ],
            [
                'exercise_id' => 11, // Tổng bình phương
                'course_ids' => [2],
                'week_number' => 1,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 12, 23, 59, 59),
            ],
            [
                'exercise_id' => 12, // Số đối xứng
                'course_ids' => [2],
                'week_number' => 2,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 17, 23, 59, 59),
            ],
            [
                'exercise_id' => 13, // Ước chung lớn nhất
                'course_ids' => [2],
                'week_number' => 2,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 19, 23, 59, 59),
            ],
            [
                'exercise_id' => 14, // Bội chung nhỏ nhất
                'course_ids' => [2],
                'week_number' => 3,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 24, 23, 59, 59),
            ],
            [
                'exercise_id' => 15, // Tổng mảng con
                'course_ids' => [2],
                'week_number' => 3,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 4, 26, 23, 59, 59),
            ],
            [
                'exercise_id' => 16, // Đảo ngược mảng
                'course_ids' => [2],
                'week_number' => 4,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 1, 23, 59, 59),
            ],
            [
                'exercise_id' => 17, // Tìm số xuất hiện nhiều nhất
                'course_ids' => [2],
                'week_number' => 4,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 3, 23, 59, 59),
            ],
            [
                'exercise_id' => 18, // Số hoàn hảo
                'course_ids' => [2],
                'week_number' => 5,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 8, 23, 59, 59),
            ],
            [
                'exercise_id' => 19, // Tổng lũy thừa
                'course_ids' => [2],
                'week_number' => 5,
                'is_hard_deadline' => false,
                'is_active' => false,
                'deadline' => Carbon::create(2025, 5, 10, 23, 59, 59),
            ],

            // Advanced exercises (9 bài) - Chủ yếu cho Course 2: Lập trình nâng cao với C++
            [
                'exercise_id' => 20, // Dãy số tăng dài nhất
                'course_ids' => [2],
                'week_number' => 6,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 15, 23, 59, 59),
            ],
            [
                'exercise_id' => 21, // Tổng nhỏ nhất của hai phần tử
                'course_ids' => [2],
                'week_number' => 6,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 17, 23, 59, 59),
            ],
            [
                'exercise_id' => 22, // Số cách chia tổng
                'course_ids' => [2],
                'week_number' => 7,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 22, 23, 59, 59),
            ],
            [
                'exercise_id' => 23, // Tìm cặp số gần nhất
                'course_ids' => [2],
                'week_number' => 7,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 24, 23, 59, 59),
            ],
            [
                'exercise_id' => 24, // Số bước nhỏ nhất
                'course_ids' => [2],
                'week_number' => 8,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 29, 23, 59, 59),
            ],
            [
                'exercise_id' => 25, // Tổng lớn nhất không liền kề
                'course_ids' => [2],
                'week_number' => 8,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 5, 31, 23, 59, 59),
            ],
            [
                'exercise_id' => 26, // Số đảo ngược lớn nhất
                'course_ids' => [2],
                'week_number' => 9,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 6, 5, 23, 59, 59),
            ],
            [
                'exercise_id' => 27, // Tổng các số nguyên tố
                'course_ids' => [2],
                'week_number' => 9,
                'is_hard_deadline' => false,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 6, 7, 23, 59, 59),
            ],
            [
                'exercise_id' => 28, // Số cách di chuyển
                'course_ids' => [2],
                'week_number' => 10,
                'is_hard_deadline' => true,
                'is_active' => true,
                'deadline' => Carbon::create(2025, 6, 12, 23, 59, 59),
            ],
        ];

        // Thực hiện seed dữ liệu
        foreach ($exerciseAssignments as $assignment) {
            foreach ($assignment['course_ids'] as $courseId) {
                $courseClasses = CourseClass::where('course_id', $courseId)->get();

                if ($courseClasses->isEmpty()) {
                    echo "Không tìm thấy lớp học nào cho course_id {$courseId}.\n";
                    continue;
                }

                foreach ($courseClasses as $courseClass) {
                    DB::table('course_exercise')->updateOrInsert(
                        [
                            'course_id' => $courseId,
                            'course_class_id' => $courseClass->id,
                            'exercise_id' => $assignment['exercise_id'],
                        ],
                        [
                            'week_number' => $assignment['week_number'],
                            'is_hard_deadline' => $assignment['is_hard_deadline'],
                            'is_active' => $assignment['is_active'],
                            'deadline' => $assignment['deadline']->toDateTimeString(),
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]
                    );
                }
            }
        }
    }
}