<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            ['name' => 'student1', 'email' => 'student1@example.com', 'password' => 'student1', 'regular_class_id' => 1, 'identity_code' => 'student1'],
            ['name' => 'student2', 'email' => 'student2@example.com', 'password' => 'student2', 'regular_class_id' => 2, 'identity_code' => 'student2'],
            ['name' => 'student3', 'email' => 'student3@example.com', 'password' => 'student3', 'regular_class_id' => 3, 'identity_code' => 'student3'],
            ['name' => 'student4', 'email' => 'student4@example.com', 'password' => 'student4', 'regular_class_id' => 4, 'identity_code' => 'student4'],
            ['name' => 'student5', 'email' => 'student5@example.com', 'password' => 'student5', 'regular_class_id' => 5, 'identity_code' => 'student5'],
            ['name' => 'student6', 'email' => 'student6@example.com', 'password' => 'student6', 'regular_class_id' => 6, 'identity_code' => 'student6'],
            ['name' => 'student7', 'email' => 'student7@example.com', 'password' => 'student7', 'regular_class_id' => 7, 'identity_code' => 'student7'],
            ['name' => 'student8', 'email' => 'student8@example.com', 'password' => 'student8', 'regular_class_id' => 8, 'identity_code' => 'student8'],
            ['name' => 'student9', 'email' => 'student9@example.com', 'password' => 'student9', 'regular_class_id' => 9, 'identity_code' => 'student9'],
            ['name' => 'student10', 'email' => 'student10@example.com', 'password' => 'student10', 'regular_class_id' => 1, 'identity_code' => 'student10'],
            ['name' => 'student11', 'email' => 'student11@example.com', 'password' => 'student11', 'regular_class_id' => 2, 'identity_code' => 'student12'],
            ['name' => 'student12', 'email' => 'student12@example.com', 'password' => 'student12', 'regular_class_id' => 3, 'identity_code' => 'student13'],
            ['name' => 'student13', 'email' => 'student13@example.com', 'password' => 'student13', 'regular_class_id' => 4, 'identity_code' => 'student14'],
            ['name' => 'student14', 'email' => 'student14@example.com', 'password' => 'student14', 'regular_class_id' => 5, 'identity_code' => 'student15'],
            ['name' => 'student15', 'email' => 'student15@example.com', 'password' => 'student15', 'regular_class_id' => 6, 'identity_code' => 'student16'],
            ['name' => 'student16', 'email' => 'student16@example.com', 'password' => 'student16', 'regular_class_id' => 7, 'identity_code' => 'student17'],
            ['name' => 'student17', 'email' => 'student17@example.com', 'password' => 'student17', 'regular_class_id' => 8, 'identity_code' => 'student18'],
            ['name' => 'student18', 'email' => 'student18@example.com', 'password' => 'student18', 'regular_class_id' => 9, 'identity_code' => 'student19'],
            ['name' => 'student19', 'email' => 'student19@example.com', 'password' => 'student19', 'regular_class_id' => 1, 'identity_code' => 'student20'],
            ['name' => 'student20', 'email' => 'student20@example.com', 'password' => 'student20', 'regular_class_id' => 2, 'identity_code' => 'student21'],
            ['name' => 'student21', 'email' => 'student21@example.com', 'password' => 'student21', 'regular_class_id' => 3, 'identity_code' => 'student22'],
            ['name' => 'student22', 'email' => 'student22@example.com', 'password' => 'student22', 'regular_class_id' => 4, 'identity_code' => 'student23'],
            ['name' => 'student23', 'email' => 'student23@example.com', 'password' => 'student23', 'regular_class_id' => 5, 'identity_code' => 'student24'],
            ['name' => 'student24', 'email' => 'student24@example.com', 'password' => 'student24', 'regular_class_id' => 6, 'identity_code' => 'student25'],
            ['name' => 'student25', 'email' => 'student25@example.com', 'password' => 'student25', 'regular_class_id' => 7, 'identity_code' => 'student26'],
            ['name' => 'student26', 'email' => 'student26@example.com', 'password' => 'student26', 'regular_class_id' => 8, 'identity_code' => 'student27'],
            ['name' => 'student27', 'email' => 'student27@example.com', 'password' => 'student27', 'regular_class_id' => 9, 'identity_code' => 'student28'],
        ];
        foreach ($students as $student) {
            User::create([
                'name' => $student['name'],
                'email' => $student['email'],
                'password' => Hash::make($student['password']),
                'regular_class_id' => $student['regular_class_id'],
            ]);
        }
    }
}
