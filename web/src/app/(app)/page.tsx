"use client";
import CourseList from "@/components/CourseList/CourseList";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import RankingBoard from "@/components/Ranking/RankingBoard";
import { useDevice } from "@/hooks/useDevice";
import { useRole } from "@/hooks/useAuth";
import Exercise from "@/types/Exercise";
import { FaClipboardList, FaTrophy, FaBook } from "react-icons/fa";

// Dữ liệu mẫu với id
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

export default function Home() {
  const { isMobile } = useDevice();
  const { isStudent } = useRole();

  if (!isStudent) return null;

  return (
    <div className="max-w-screen mx-auto">
      <div className={`flex`}>
        <div className={`flex`}>
          <PendingExerciseList
            exercises={sampleExercises}
            onSelectExercise={(exercise) => console.log(exercise)}
          />
        </div>
        {/*<div className={`${isMobile ? "col-span-1" : "col-span-2"} flex flex-col gap-2`}>*/}
        {/*  <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-2 border-l-2 border-primary shadow-secondary">*/}
        {/*    <div className="p-2 mt-2 border-b flex items-center gap-2">*/}
        {/*      <FaTrophy className="text-yellow-600" />*/}
        {/*      <h2 className="text-md font-semibold text-gray-800">Bảng xếp hạng</h2>*/}
        {/*    </div>*/}
        {/*    <div className="overflow-auto">*/}
        {/*      <RankingBoard />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-2 border-l-2 border-primary shadow-secondary">*/}
        {/*    <div className="p-2 border-b bg-gray-50 flex items-center gap-2">*/}
        {/*      <FaBook className="text-green-600" />*/}
        {/*      <h2 className="text-md font-semibold text-gray-800">Lớp học của tôi</h2>*/}
        {/*    </div>*/}
        {/*    <div className="overflow-auto">*/}
        {/*      <CourseList />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}