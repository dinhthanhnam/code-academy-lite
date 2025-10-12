<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\Conversation;
use App\Models\CourseAttendant;
use Carbon\Carbon;

class MessagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Lấy danh sách conversations có course_class_id
        $conversations = Conversation::whereNotNull('course_class_id')->get();

        if ($conversations->isEmpty()) {
            echo "Error: No conversations with course_class_id found.\n";
            return;
        }

        // Dữ liệu mẫu cho nội dung tin nhắn
        $sampleContents = [
            "Xin chào, mọi người đang học bài nào vậy?",
            "Bài tập tuần này khó quá, có ai làm xong chưa?",
            "Cô giáo vừa gửi tài liệu mới, mọi người xem chưa?",
            "Có ai biết cách giải bài 3 không?",
            "Hẹn gặp mọi người ở lớp chiều nay nhé!",
            "Cảm ơn bạn đã chia sẻ tài liệu!",
            "Mình cần hỏi về đề cương ôn thi, ai giúp được không?",
            "Nhóm mình họp online lúc 8h tối nay nhé.",
            "Bài giảng hôm nay thú vị thật đấy!",
            "Mọi người đã nộp bài tập chưa?"
        ];

        foreach ($conversations as $conversation) {
            // Lấy danh sách user_id tham gia lớp tương ứng từ course_attendant
            $attendants = CourseAttendant::where('course_class_id', $conversation->course_class_id)
                ->pluck('user_id')
                ->toArray();

            if (empty($attendants)) {
                echo "Warning: No attendants found for course_class_id {$conversation->course_class_id}.\n";
                continue;
            }

            // Tạo 5-10 tin nhắn ngẫu nhiên cho mỗi conversation
            $messageCount = rand(5, 10);
            for ($i = 0; $i < $messageCount; $i++) {
                Message::create([
                    'user_id' => $attendants[array_rand($attendants)], // Chọn ngẫu nhiên user_id từ attendants
                    'conversation_id' => $conversation->id,
                    'content' => $sampleContents[array_rand($sampleContents)], // Chọn ngẫu nhiên nội dung
                    'created_at' => Carbon::now()->subMinutes(rand(1, 1440)), // Thời gian ngẫu nhiên trong 24 giờ qua
                    'updated_at' => Carbon::now()->subMinutes(rand(1, 1440)),
                ]);
            }
        }

        echo "Seeded messages successfully.\n";
    }
}