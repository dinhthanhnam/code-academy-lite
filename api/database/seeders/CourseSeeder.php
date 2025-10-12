<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\CourseAttendant;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\CourseClass;
use App\Models\RegularClass;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Dữ liệu mẫu dưới dạng mảng (có thể chuyển từ JSON nếu cần)
        $courses = [
            [
                'course_code' => 'IS52A',
                'name' => 'Năng lực số ứng dụng',
                'course_classes' => [
                    [
                        'assigned_regular_class' => 'K24CNTTA',
                        'course_class_code' => 'IS52A01',
                        'name' => 'K24CNTTA - IS52A',
                        'description' => 'Lớp năng lực số ứng dụng K24CNTTA - IS52A',
                        'lecturer' => 'Giang Thu Huyền',
                        'start_date' => '2025-03-15',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTA',
                        'course_class_code' => 'IS52A02',
                        'name' => 'K24HTTTA - IS52A',
                        'description' => 'Lớp năng lực số ứng dụng K24HTTTA - IS52A',
                        'start_date' => '2025-03-15',
                        'lecturer' => 'Giang Thu Huyền',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTB',
                        'course_class_code' => 'IS52A03',
                        'name' => 'K24HTTTB - IS52A',
                        'description' => 'Lớp năng lực số ứng dụng K24HTTTB - IS52A',
                        'start_date' => '2025-03-15',
                        'lecturer' => 'Giang Thu Huyền',
                    ],
                ],
            ],
            [
                'course_code' => 'IS57A',
                'name' => 'Nhập môn ngành công nghệ thông tin',
                'course_classes' => [
                    [
                        'assigned_regular_class' => 'K24CNTTA',
                        'course_class_code' => 'IS57A01',
                        'name' => 'K24CNTTA - IS57A',
                        'description' => 'Lớp nhập môn ngành công nghệ thông tin K24CNTTA - IS57A',
                        'lecturer' => 'Nguyễn Ngọc Thuỵ',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTA',
                        'course_class_code' => 'IS57A02',
                        'name' => 'K24HTTTA - IS57A',
                        'description' => 'Lớp nhập môn ngành công nghệ thông tin K24HTTTA - IS57A',
                        'lecturer' => 'Nguyễn Ngọc Thuỵ',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTB',
                        'course_class_code' => 'IS57A03',
                        'name' => 'K24HTTTB - IS57A',
                        'description' => 'Lớp nhập môn ngành công nghệ thông tin K24HTTTB - IS57A',
                        'lecturer' => 'Nguyễn Ngọc Thuỵ',
                        'start_date' => '2025-03-16',
                    ],
                ],
            ],
            [
                'course_code' => 'IS22A',
                'name' => 'Cơ sở lập trình',
                'course_classes' => [
                    [
                        'assigned_regular_class' => 'K24CNTTA',
                        'course_class_code' => 'IS22A01',
                        'name' => 'K24CNTTA - IS22A',
                        'description' => 'Lớp cơ sở lập trình K24CNTTA - IS22A',
                        'lecturer' => 'Nguyễn Ngọc Thuỵ',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTA',
                        'course_class_code' => 'IS22A02',
                        'name' => 'K24HTTTA - IS22A',
                        'description' => 'Lớp cơ sở lập trình K24HTTTA - IS22A',
                        'lecturer' => 'Nguyễn Ngọc Thuỵ',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTB',
                        'course_class_code' => 'IS22A03',
                        'name' => 'K24HTTTB - IS22A',
                        'description' => 'Lớp cơ sở lập trình K24HTTTB - IS22A',
                        'lecturer' => 'Nguyễn Ngọc Thuỵ',
                        'start_date' => '2025-03-16',
                    ],
                ],
            ],
            [
                'course_code' => 'IS28A',
                'name' => 'Lập trình nâng cao với C',
                'course_classes' => [
                    [
                        'assigned_regular_class' => 'K24CNTTA',
                        'course_class_code' => 'IS28A01',
                        'name' => 'K24CNTTA - IS28A',
                        'description' => 'Lập trình nâng cao với C K24CNTTA - IS28A',
                        'lecturer' => 'Lê Văn Hùng',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTA',
                        'course_class_code' => 'IS28A02',
                        'name' => 'K24HTTTA - IS28A',
                        'description' => 'Lập trình nâng cao với C K24HTTTA - IS28A',
                        'lecturer' => 'Lê Văn Hùng',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTB',
                        'course_class_code' => 'IS28A03',
                        'name' => 'K24HTTTB - IS28A',
                        'description' => 'Lập trình nâng cao với C K24HTTTB - IS28A',
                        'lecturer' => 'Lê Văn Hùng',
                        'start_date' => '2025-03-16',
                    ],
                ],
            ],
            [
                'course_code' => 'IS29A',
                'name' => 'Lập trình nâng cao với C++',
                'course_classes' => [
                    [
                        'assigned_regular_class' => 'K24CNTTA',
                        'course_class_code' => 'IS29A01',
                        'name' => 'K24CNTTA - IS29A',
                        'description' => 'Lập trình nâng cao với C++ K24CNTTA - IS29A',
                        'lecturer' => 'Lê Văn Hùng',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTA',
                        'course_class_code' => 'IS29A02',
                        'name' => 'K24HTTTA - IS29A',
                        'description' => 'Lập trình nâng cao với C++ K24HTTTA - IS29A',
                        'lecturer' => 'Lê Văn Hùng',
                        'start_date' => '2025-03-16',
                    ],
                    [
                        'assigned_regular_class' => 'K24HTTTB',
                        'course_class_code' => 'IS29A03',
                        'name' => 'K24HTTTB - IS29A',
                        'description' => 'Lập trình nâng cao với C++ K24HTTTB - IS29A',
                        'lecturer' => 'Lê Văn Hùng',
                        'start_date' => '2025-03-16',
                    ],
                ],
            ],
        ];

        foreach ($courses as $course) {
            // Tạo bản ghi trong bảng courses
            $course_model = Course::create([
                'course_code' => $course['course_code'],
                'name' => $course['name'],
            ]);

            // Seed các course_classes liên quan
            if (isset($course['course_classes'])) {
                foreach ($course['course_classes'] as $course_class) {
                    $regular_class_model = RegularClass::where('class_code', $course_class['assigned_regular_class'])->first();

                    $slug = Str::slug(substr($course_class['assigned_regular_class'], 0, 3) . '-' . $course_class['course_class_code']);
                    $course_class_model = CourseClass::create([
                        'assigned_regular_class_id' => $regular_class_model->id,
                        'course_class_code' => $course_class['course_class_code'],
                        'course_class_join_code' => Str::random(8),
                        'name' => $course_class['name'],
                        'description' => $course_class['description'] ?? null,
                        'start_date' => Date::parse($course_class['start_date']),
                        'course_id' => $course_model->id,
                        'slug' => $slug,
                    ]);

                    $students_model = $regular_class_model->regular_students; // Quan hệ hasMany đã định nghĩa
                    foreach ($students_model as $student) {
                        CourseAttendant::create([
                            'course_class_id' => $course_class_model->id,
                            'user_id' => $student->id,
                            'role' => $student->role,
                        ]);
                    }

                    $lecturers_model = User::where('name', $course_class['lecturer'])->first();
                    CourseAttendant::create([
                        'course_class_id' => $course_class_model->id,
                        'user_id' => $lecturers_model->id,
                        'role' => $lecturers_model->role,
                    ]);
                    $course_conversation_model = Conversation::create([
                        'name' => $course_class_model->name,
                        'course_class_id' => $course_class_model->id,
                        'slug' => $slug,
                    ]);
                }
            }
        }
    }
}
