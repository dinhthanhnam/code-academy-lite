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
            ['name' => 'Triệu Thu Hương', 'email' => 'huongtt@hvnh.edu.vn', 'password' => 'huong123'],
            ['name' => 'Trần Viết Huy', 'email' => 'huytv@hvnh.edu.vn', 'password' => 'huy123'],
            ['name' => 'Nguyễn Ngọc Thuỵ', 'email' => 'thuynn@hvnh.edu.vn', 'password' => 'thuy123'],
            ['name' => 'Giang Thu Huyền', 'email' => 'huyengt@hvnh.edu.vn', 'password' => 'huyen123'],
            ['name' => 'Lê Văn Hùng', 'email' => 'lehung@hvnh.edu.vn', 'password' => 'lehung123'],
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
