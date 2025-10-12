"use client";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import Exercise from "@/types/Exercise";
import { FaTasks } from "react-icons/fa";

const sampleExercises: Exercise[] = [
  { id: 1, title: "Chia lấy nguyên", level: "Cơ bản", topics: ["Math"], pivot: { course_id: 1, week_number: 1, deadline: "2025-04-13", is_active: 1, is_hard_deadline: 0 } },
  { id: 2, title: "Kiểm tra số âm", level: "Cơ bản", topics: ["Math", "Conditionals"], pivot: { course_id: 2, week_number: 1, deadline: "2025-04-07", is_active: 1, is_hard_deadline: 0 } },
  { id: 3, title: "Tổng các chữ số", level: "Cơ bản", topics: ["Math", "String"], pivot: { course_id: 3, week_number: 2, deadline: "2025-04-14", is_active: 1, is_hard_deadline: 0 } },
  { id: 4, title: "Tính giai thừa", level: "Trung cấp", topics: ["Math", "Recursion"], pivot: { course_id: 4, week_number: 2, deadline: "2025-04-16", is_active: 1, is_hard_deadline: 0 } },
  { id: 5, title: "Tổng dãy số", level: "Trung cấp", topics: ["Array", "Math"], pivot: { course_id: 5, week_number: 3, deadline: "2025-04-10", is_active: 0, is_hard_deadline: 0 } },
  { id: 6, title: "Ước chung lớn nhất", level: "Trung cấp", topics: ["Math", "Algorithms"], pivot: { course_id: 6, week_number: 3, deadline: "2025-04-18", is_active: 1, is_hard_deadline: 1 } },
  { id: 7, title: "Tổng mảng con", level: "Trung cấp", topics: ["Array", "Sliding Window"], pivot: { course_id: 7, week_number: 4, deadline: "2025-04-19", is_active: 1, is_hard_deadline: 0 } },
  { id: 8, title: "Tìm số xuất hiện nhiều nhất", level: "Trung cấp", topics: ["Array", "HashMap"], pivot: { course_id: 1, week_number: 4, deadline: "2025-04-17", is_active: 1, is_hard_deadline: 0 } },
  { id: 9, title: "Số cách di chuyển", level: "Nâng cao", topics: ["Dynamic Programming", "Math"], pivot: { course_id: 2, week_number: 5, deadline: "2025-04-22", is_active: 1, is_hard_deadline: 1 } },
  { id: 10, title: "Tổng lớn nhất không liền kề", level: "Nâng cao", topics: ["Array", "Dynamic Programming"], pivot: { course_id: 3, week_number: 5, deadline: "2025-04-25", is_active: 1, is_hard_deadline: 1 } },
  { id: 11, title: "Đếm số chữ số", level: "Cơ bản", topics: ["Math", "String"], pivot: { course_id: 4, week_number: 1, deadline: "2025-04-15", is_active: 1, is_hard_deadline: 0 } },
  { id: 12, title: "Tìm số nhỏ nhất", level: "Cơ bản", topics: ["Math", "Comparison"], pivot: { course_id: 5, week_number: 1, deadline: "2025-04-08", is_active: 1, is_hard_deadline: 0 } },
  { id: 13, title: "Kiểm tra tam giác", level: "Trung cấp", topics: ["Math", "Geometry"], pivot: { course_id: 6, week_number: 2, deadline: "2025-04-20", is_active: 1, is_hard_deadline: 0 } },
  { id: 14, title: "Tổng bình phương", level: "Trung cấp", topics: ["Math", "Loops"], pivot: { course_id: 7, week_number: 2, deadline: "2025-04-21", is_active: 1, is_hard_deadline: 0 } },
  { id: 15, title: "Số đối xứng", level: "Trung cấp", topics: ["String", "Math"], pivot: { course_id: 1, week_number: 3, deadline: "2025-04-12", is_active: 0, is_hard_deadline: 0 } },
  { id: 16, title: "Bội chung nhỏ nhất", level: "Trung cấp", topics: ["Math", "Algorithms"], pivot: { course_id: 2, week_number: 3, deadline: "2025-04-23", is_active: 1, is_hard_deadline: 1 } },
  { id: 17, title: "Đảo ngược mảng", level: "Trung cấp", topics: ["Array"], pivot: { course_id: 3, week_number: 4, deadline: "2025-04-24", is_active: 1, is_hard_deadline: 0 } },
  { id: 18, title: "Số hoàn hảo", level: "Trung cấp", topics: ["Math", "Number Theory"], pivot: { course_id: 4, week_number: 4, deadline: "2025-04-26", is_active: 1, is_hard_deadline: 0 } },
  { id: 19, title: "Dãy số tăng dài nhất", level: "Nâng cao", topics: ["Array", "Dynamic Programming"], pivot: { course_id: 5, week_number: 5, deadline: "2025-04-27", is_active: 1, is_hard_deadline: 1 } },
  { id: 20, title: "Tổng các số nguyên tố", level: "Nâng cao", topics: ["Math", "Prime Numbers"], pivot: { course_id: 6, week_number: 5, deadline: "2025-04-28", is_active: 1, is_hard_deadline: 1 } },
];

export default function PendingExercisesPage({ params }) {
  const pendingExercises = sampleExercises.filter(ex => ex.pivot.is_active === 1);

  // Thống kê theo độ khó
  const easyCount = pendingExercises.filter(ex => ex.level === "Cơ bản").length;
  const mediumCount = pendingExercises.filter(ex => ex.level === "Trung cấp").length;
  const advancedCount = pendingExercises.filter(ex => ex.level === "Nâng cao").length;
  const examCount = pendingExercises.filter(ex => ex.level === "Exam").length;

  // Tìm bài có hạn gần nhất
  const nearestDeadlineExercise = pendingExercises
    .sort((a, b) => new Date(a.pivot.deadline).getTime() - new Date(b.pivot.deadline).getTime())[0];

  return (
    <div className="max-w-screen min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-10 py-4">
          <div className=" flex text-left items-center gap-3">
            <FaTasks className="text-2xl text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Danh sách các bài tập cần làm
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Thống kê và chi tiết các bài tập bạn chưa hoàn thành
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen mx-auto px-6 py-8 flex-1">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập cơ bản</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{easyCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập trung cấp</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{mediumCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập nâng cao</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{advancedCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài kiểm tra</h3>
            <p className="text-3xl font-bold text-primary mt-2">{examCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập gần nhất đến hạn</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">
              {nearestDeadlineExercise ? 
                `${nearestDeadlineExercise.title} (${nearestDeadlineExercise.pivot.deadline})` : 
                "None"}
            </p>
          </div>
        </div>

        {/* Detailed List */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <PendingExerciseList
            exercises={pendingExercises}
            onSelectExercise={(exercise) => console.log(exercise)}
          />
        </div>
      </main>

    </div>
  );
}