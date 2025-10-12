<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseClass;
use App\Models\CourseExercise;
use Illuminate\Database\Seeder;
use App\Models\Exercise;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exercises = [
            [
                'title' => 'Tính hiệu hai số',
                'description' => 'Nhập hai số nguyên và tính hiệu của chúng (số thứ nhất trừ số thứ hai).',
                'level' => 'basic',
                'example_input' => '10 4',
                'example_output' => '6',
                'test_cases' => json_encode([
                    ['stdin' => '15 7', 'expected_output' => '8'],
                    ['stdin' => '-3 5', 'expected_output' => '-8'],
                    ['stdin' => '0 -9', 'expected_output' => '9']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Tính tích hai số',
                'description' => 'Nhập hai số nguyên và tính tích của chúng.',
                'level' => 'basic',
                'example_input' => '6 4',
                'example_output' => '24',
                'test_cases' => json_encode([
                    ['stdin' => '5 3', 'expected_output' => '15'],
                    ['stdin' => '-2 8', 'expected_output' => '-16'],
                    ['stdin' => '0 10', 'expected_output' => '0']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Chia lấy nguyên',
                'description' => 'Nhập hai số nguyên, trả về kết quả chia lấy nguyên của số thứ nhất cho số thứ hai.',
                'level' => 'basic',
                'example_input' => '10 3',
                'example_output' => '3',
                'test_cases' => json_encode([
                    ['stdin' => '20 4', 'expected_output' => '5'],
                    ['stdin' => '-15 2', 'expected_output' => '-7'],
                    ['stdin' => '7 7', 'expected_output' => '1']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Kiểm tra số âm',
                'description' => 'Nhập một số nguyên, trả về 1 nếu là số âm, 0 nếu không phải.',
                'level' => 'basic',
                'example_input' => '-5',
                'example_output' => '1',
                'test_cases' => json_encode([
                    ['stdin' => '3', 'expected_output' => '0'],
                    ['stdin' => '-10', 'expected_output' => '1'],
                    ['stdin' => '0', 'expected_output' => '0']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Tổng các chữ số',
                'description' => 'Nhập một số nguyên, tính tổng các chữ số của nó.',
                'level' => 'basic',
                'example_input' => '123',
                'example_output' => '6',
                'test_cases' => json_encode([
                    ['stdin' => '45', 'expected_output' => '9'],
                    ['stdin' => '0', 'expected_output' => '0'],
                    ['stdin' => '1000', 'expected_output' => '1']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Đếm số chữ số',
                'description' => 'Nhập một số nguyên, trả về số lượng chữ số của nó.',
                'level' => 'basic',
                'example_input' => '5678',
                'example_output' => '4',
                'test_cases' => json_encode([
                    ['stdin' => '12', 'expected_output' => '2'],
                    ['stdin' => '-345', 'expected_output' => '3'],
                    ['stdin' => '0', 'expected_output' => '1']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Tính giai thừa',
                'description' => 'Nhập một số nguyên n (0 <= n <= 12), trả về giai thừa của n.',
                'level' => 'basic',
                'example_input' => '5',
                'example_output' => '120',
                'test_cases' => json_encode([
                    ['stdin' => '0', 'expected_output' => '1'],
                    ['stdin' => '3', 'expected_output' => '6'],
                    ['stdin' => '7', 'expected_output' => '5040']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Tổng dãy số',
                'description' => 'Nhập số nguyên n và n số tiếp theo, trả về tổng của chúng.',
                'level' => 'basic',
                'example_input' => "4\n1 2 3 4",
                'example_output' => '10',
                'test_cases' => json_encode([
                    ['stdin' => "3\n5 5 5", 'expected_output' => '15'],
                    ['stdin' => "2\n-1 1", 'expected_output' => '0'],
                    ['stdin' => "1\n7", 'expected_output' => '7']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [3], // arrays
                'language' => 1,
            ],
            [
                'title' => 'Tìm số nhỏ nhất',
                'description' => 'Nhập ba số nguyên và trả về số nhỏ nhất.',
                'level' => 'basic',
                'example_input' => '5 2 9',
                'example_output' => '2',
                'test_cases' => json_encode([
                    ['stdin' => '10 3 7', 'expected_output' => '3'],
                    ['stdin' => '-5 -2 -8', 'expected_output' => '-8'],
                    ['stdin' => '4 4 4', 'expected_output' => '4']
                ]),
                'is_free' => true,
                'time_limit' => 1,
                'memory_limit' => 128,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Kiểm tra tam giác',
                'description' => 'Nhập ba số nguyên dương, trả về 1 nếu chúng tạo thành tam giác, 0 nếu không.',
                'level' => 'intermediate',
                'example_input' => '3 4 5',
                'example_output' => '1',
                'test_cases' => json_encode([
                    ['stdin' => '1 1 3', 'expected_output' => '0'],
                    ['stdin' => '5 5 5', 'expected_output' => '1'],
                    ['stdin' => '2 3 6', 'expected_output' => '0']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Tổng bình phương',
                'description' => 'Nhập số nguyên n, tính tổng bình phương các số từ 1 đến n.',
                'level' => 'intermediate',
                'example_input' => '3',
                'example_output' => '14',
                'test_cases' => json_encode([
                    ['stdin' => '1', 'expected_output' => '1'],
                    ['stdin' => '4', 'expected_output' => '30'],
                    ['stdin' => '5', 'expected_output' => '55']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Số đối xứng',
                'description' => 'Nhập một số nguyên, trả về 1 nếu là số đối xứng (palindrome), 0 nếu không.',
                'level' => 'intermediate',
                'example_input' => '12321',
                'example_output' => '1',
                'test_cases' => json_encode([
                    ['stdin' => '12345', 'expected_output' => '0'],
                    ['stdin' => '11', 'expected_output' => '1'],
                    ['stdin' => '0', 'expected_output' => '1']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Ước chung lớn nhất',
                'description' => 'Nhập hai số nguyên dương, trả về ước chung lớn nhất của chúng.',
                'level' => 'intermediate',
                'example_input' => '48 18',
                'example_output' => '6',
                'test_cases' => json_encode([
                    ['stdin' => '15 25', 'expected_output' => '5'],
                    ['stdin' => '7 13', 'expected_output' => '1'],
                    ['stdin' => '100 10', 'expected_output' => '10']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Bội chung nhỏ nhất',
                'description' => 'Nhập hai số nguyên dương, trả về bội chung nhỏ nhất của chúng.',
                'level' => 'intermediate',
                'example_input' => '6 8',
                'example_output' => '24',
                'test_cases' => json_encode([
                    ['stdin' => '3 5', 'expected_output' => '15'],
                    ['stdin' => '7 7', 'expected_output' => '7'],
                    ['stdin' => '12 18', 'expected_output' => '36']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Tổng mảng con',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về số lượng mảng con có tổng bằng k (dòng thứ ba là k).',
                'level' => 'intermediate',
                'example_input' => "4\n1 2 3 4\n6",
                'example_output' => '2',
                'test_cases' => json_encode([
                    ['stdin' => "3\n1 2 3\n5", 'expected_output' => '1'],
                    ['stdin' => "5\n1 1 1 1 1\n3", 'expected_output' => '3'],
                    ['stdin' => "2\n1 2\n4", 'expected_output' => '0']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [3], // arrays
                'language' => 1,
            ],
            [
                'title' => 'Đảo ngược mảng',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về mảng đảo ngược (các số cách nhau bởi dấu cách).',
                'level' => 'intermediate',
                'example_input' => "5\n1 2 3 4 5",
                'example_output' => '5 4 3 2 1',
                'test_cases' => json_encode([
                    ['stdin' => "3\n7 8 9", 'expected_output' => '9 8 7'],
                    ['stdin' => "1\n5", 'expected_output' => '5'],
                    ['stdin' => "4\n-1 0 2 3", 'expected_output' => '3 2 0 -1']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [3], // arrays
                'language' => 1,
            ],
            [
                'title' => 'Tìm số xuất hiện nhiều nhất',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về số xuất hiện nhiều nhất (nếu có nhiều số thì trả về số nhỏ nhất).',
                'level' => 'intermediate',
                'example_input' => "5\n1 2 2 3 2",
                'example_output' => '2',
                'test_cases' => json_encode([
                    ['stdin' => "4\n1 1 2 2", 'expected_output' => '1'],
                    ['stdin' => "3\n5 5 5", 'expected_output' => '5'],
                    ['stdin' => "6\n1 2 3 1 2 3", 'expected_output' => '1']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [3], // arrays
                'language' => 1,
            ],
            [
                'title' => 'Số hoàn hảo',
                'description' => 'Nhập một số nguyên dương, trả về 1 nếu là số hoàn hảo (tổng các ước nhỏ hơn nó bằng chính nó), 0 nếu không.',
                'level' => 'intermediate',
                'example_input' => '28',
                'example_output' => '1',
                'test_cases' => json_encode([
                    ['stdin' => '6', 'expected_output' => '1'],
                    ['stdin' => '15', 'expected_output' => '0'],
                    ['stdin' => '496', 'expected_output' => '1']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Tổng lũy thừa',
                'description' => 'Nhập hai số nguyên n và k, tính tổng lũy thừa k của các số từ 1 đến n.',
                'level' => 'intermediate',
                'example_input' => '3 2',
                'example_output' => '14',
                'test_cases' => json_encode([
                    ['stdin' => '4 3', 'expected_output' => '100'],
                    ['stdin' => '2 1', 'expected_output' => '3'],
                    ['stdin' => '5 2', 'expected_output' => '55']
                ]),
                'is_free' => false,
                'time_limit' => 2,
                'memory_limit' => 256,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Dãy số tăng dài nhất',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về độ dài của dãy con tăng dài nhất.',
                'level' => 'advanced',
                'example_input' => "6\n10 9 2 5 3 7",
                'example_output' => '3',
                'test_cases' => json_encode([
                    ['stdin' => "5\n1 2 3 4 5", 'expected_output' => '5'],
                    ['stdin' => "3\n3 2 1", 'expected_output' => '1'],
                    ['stdin' => "7\n1 3 2 4 7 6 5", 'expected_output' => '4']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [3, 7], // arrays, dp
                'language' => 1,
            ],
            [
                'title' => 'Tổng nhỏ nhất của hai phần tử',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về tổng nhỏ nhất của hai phần tử bất kỳ.',
                'level' => 'advanced',
                'example_input' => "4\n5 2 4 1",
                'example_output' => '3',
                'test_cases' => json_encode([
                    ['stdin' => "3\n10 20 30", 'expected_output' => '30'],
                    ['stdin' => "5\n-1 -5 2 3 4", 'expected_output' => '-6'],
                    ['stdin' => "2\n7 8", 'expected_output' => '15']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [3, 5], // arrays, sorting
                'language' => 1,
            ],
            [
                'title' => 'Số cách chia tổng',
                'description' => 'Nhập hai số nguyên n và k, trả về số cách chia n thành tổng của k số nguyên dương.',
                'level' => 'advanced',
                'example_input' => '4 2',
                'example_output' => '3',
                'test_cases' => json_encode([
                    ['stdin' => '5 3', 'expected_output' => '6'],
                    ['stdin' => '3 1', 'expected_output' => '1'],
                    ['stdin' => '6 2', 'expected_output' => '5']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [7], // dp
                'language' => 1,
            ],
            [
                'title' => 'Tìm cặp số gần nhất',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về hiệu nhỏ nhất giữa hai phần tử bất kỳ.',
                'level' => 'advanced',
                'example_input' => "5\n2 9 4 7 1",
                'example_output' => '1',
                'test_cases' => json_encode([
                    ['stdin' => "4\n1 5 3 2", 'expected_output' => '1'],
                    ['stdin' => "3\n10 20 30", 'expected_output' => '10'],
                    ['stdin' => "6\n-5 -2 0 3 5 8", 'expected_output' => '2']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [3, 5], // arrays, sorting
                'language' => 1,
            ],
            [
                'title' => 'Số bước nhỏ nhất',
                'description' => 'Nhập số nguyên n, trả về số bước nhỏ nhất để đưa n về 1 (chia 2 nếu chẵn, +1 hoặc -1 nếu lẻ).',
                'level' => 'advanced',
                'example_input' => '13',
                'example_output' => '4',
                'test_cases' => json_encode([
                    ['stdin' => '7', 'expected_output' => '3'],
                    ['stdin' => '1', 'expected_output' => '0'],
                    ['stdin' => '15', 'expected_output' => '5']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [7], // dp
                'language' => 1,
            ],
            [
                'title' => 'Tổng lớn nhất không liền kề',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về tổng lớn nhất của các phần tử không liền kề nhau.',
                'level' => 'advanced',
                'example_input' => "5\n5 1 2 6 3",
                'example_output' => '14',
                'test_cases' => json_encode([
                    ['stdin' => "4\n1 2 3 4", 'expected_output' => '6'],
                    ['stdin' => "3\n10 5 10", 'expected_output' => '20'],
                    ['stdin' => "6\n1 2 3 4 5 6", 'expected_output' => '12']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [3, 7], // arrays, dp
                'language' => 1,
            ],
            [
                'title' => 'Số đảo ngược lớn nhất',
                'description' => 'Nhập một mảng (dòng đầu là n, dòng sau là n số), trả về số lớn nhất sau khi đảo ngược từng số.',
                'level' => 'advanced',
                'example_input' => "4\n123 45 67 890",
                'example_output' => '980',
                'test_cases' => json_encode([
                    ['stdin' => "3\n12 34 56", 'expected_output' => '65'],
                    ['stdin' => "2\n100 200", 'expected_output' => '200'],
                    ['stdin' => "5\n1 2 3 4 5", 'expected_output' => '5']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [3], // arrays
                'language' => 1,
            ],
            [
                'title' => 'Tổng các số nguyên tố',
                'description' => 'Nhập số nguyên n, tính tổng các số nguyên tố nhỏ hơn hoặc bằng n.',
                'level' => 'advanced',
                'example_input' => '10',
                'example_output' => '17',
                'test_cases' => json_encode([
                    ['stdin' => '5', 'expected_output' => '10'],
                    ['stdin' => '20', 'expected_output' => '77'],
                    ['stdin' => '2', 'expected_output' => '2']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [],
                'language' => 1,
            ],
            [
                'title' => 'Số cách di chuyển',
                'description' => 'Nhập hai số nguyên m và n, trả về số cách đi từ (0,0) đến (m,n) chỉ đi lên hoặc sang phải.',
                'level' => 'advanced',
                'example_input' => '2 3',
                'example_output' => '10',
                'test_cases' => json_encode([
                    ['stdin' => '1 1', 'expected_output' => '2'],
                    ['stdin' => '3 2', 'expected_output' => '10'],
                    ['stdin' => '4 4', 'expected_output' => '70']
                ]),
                'is_free' => false,
                'time_limit' => 3,
                'memory_limit' => 512,
                'topics' => [7], // dp
                'language' => 1,
            ],
        ];
        foreach ($exercises as $exerciseData) {
            $exercise = Exercise::create([
                'title' => $exerciseData['title'],
                'description' => $exerciseData['description'],
                'level' => $exerciseData['level'],
                'example_input' => $exerciseData['example_input'],
                'example_output' => $exerciseData['example_output'],
                'test_cases' => $exerciseData['test_cases'],
                'is_free' => $exerciseData['is_free'],
                'time_limit' => $exerciseData['time_limit'],
                'memory_limit' => $exerciseData['memory_limit'],
            ]);

            if (!empty($exerciseData['topics'])) {
                $exercise->topics()->attach($exerciseData['topics']);
            }
            $exercise->language()->attach($exerciseData['language']);
        }

        // Lấy danh sách bài tập theo mức độ
        $basic_exercises = Exercise::where('level', 'basic')->orderBy('id')->get();
        $intermediate_exercises = Exercise::where('level', 'intermediate')->orderBy('id')->get();
        $advanced_exercises = Exercise::where('level', 'advanced')->orderBy('id')->get();

        // Lấy thông tin các khóa học
        $course_intro_it = Course::where('name', 'Nhập môn ngành công nghệ thông tin')->firstOrFail();
        $course_digital_skills = Course::where('name', 'Năng lực số ứng dụng')->firstOrFail();
        $course_cpp = Course::where('name', 'Lập trình nâng cao với C++')->firstOrFail();
        $course_c = Course::where('name', 'Lập trình nâng cao với C')->firstOrFail();
        $course_cslt = Course::where('name', 'Cơ sở lập trình')->firstOrFail();

        // Lấy danh sách lớp học của từng khóa
        $classes_intro_it = CourseClass::where('course_id', $course_intro_it->id)->get();
        $classes_digital_skills = CourseClass::where('course_id', $course_digital_skills->id)->get();
        $classes_cpp = CourseClass::where('course_id', $course_cpp->id)->get();
        $classes_c = CourseClass::where('course_id', $course_c->id)->get();
        $classes_cslt = CourseClass::where('course_id', $course_cslt->id)->get();

        // 1. Gắn bài tập cho "Nhập môn ngành công nghệ thông tin" (chỉ basic)
        foreach ($classes_intro_it as $course_class) {
            $week = 1;
            foreach ($basic_exercises->take(8) as $exercise) { // Lấy 8 bài basic
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_intro_it->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
        }

        // 2. Gắn bài tập cho "Năng lực số ứng dụng" (basic + 2 intermediate)
        foreach ($classes_digital_skills as $course_class) {
            $week = 1;
            foreach ($basic_exercises->take(6) as $exercise) { // Lấy 6 bài basic
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_digital_skills->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
            foreach ($intermediate_exercises->take(2) as $exercise) { // Lấy 2 bài intermediate
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_digital_skills->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
        }

        // 3. Gắn bài tập cho "Lập trình nâng cao với C++" (intermediate + advanced)
        foreach ($classes_cpp as $course_class) {
            $week = 1;
            foreach ($intermediate_exercises->take(6) as $exercise) { // Lấy 6 bài intermediate
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_cpp->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
            foreach ($advanced_exercises->take(6) as $exercise) { // Lấy 6 bài advanced
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_cpp->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
        }

        // 4. Gắn bài tập cho "Lập trình nâng cao với C" (intermediate + advanced)
        foreach ($classes_c as $course_class) {
            $week = 1;
            foreach ($intermediate_exercises->skip(6)->take(6) as $exercise) { // Lấy 6 bài intermediate khác
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_c->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
            foreach ($advanced_exercises->skip(3)->take(6) as $exercise) { // Lấy 6 bài advanced khác
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_c->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
        }

        // 5. Gắn bài tập cho "Cơ sở lập trình" (chỉ basic)
        foreach ($classes_cslt as $course_class) {
            $week = 1;
            foreach ($basic_exercises->skip(8)->take(8) as $exercise) { // Lấy 8 bài basic khác
                $course_class->exercises()->syncWithoutDetaching([
                    $exercise->id => [
                        'course_id' => $course_cslt->id,
                        'course_class_id' => $course_class->id,
                        'week_number' => $week,
                        'is_hard_deadline' => false,
                        'is_active' => true,
                    ]
                ]);
                $week++;
            }
        }
    }
}
