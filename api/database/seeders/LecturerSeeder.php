<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LecturerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lecturers = [
            ['name' => 'Giảng viên 1', 'email' => 'lecturer1@example.com', 'password' => 'lecturer1'],
            ['name' => 'Giảng viên 3', 'email' => 'lecturer2@example.com', 'password' => 'lecturer2'],
            ['name' => 'Giảng viên 2', 'email' => 'lecturer3@example.com', 'password' => 'lecturer3'],
            ['name' => 'Giảng viên 4', 'email' => 'lecturer4@example.com', 'password' => 'lecturer4'],
            ['name' => 'Giảng viên 5', 'email' => 'lecturer5@example.com', 'password' => 'lecturer5'],
        ];
        foreach ($lecturers as $lecturer) {
            User::create([
                'name' => $lecturer['name'],
                'email' => $lecturer['email'],
                'identity_code' => $lecturer['email'],
                'password' => Hash::make($lecturer['password']),
                'role' => 'lecturer',
            ]);
        }
    }
}
