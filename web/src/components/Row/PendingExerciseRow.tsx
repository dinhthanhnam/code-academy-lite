import { BiChevronRight } from "react-icons/bi";
import Exercise, { PendingExerciseRowProps } from "@/types/Exercise";
import {MdCheckBoxOutlineBlank, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";

// Ánh xạ giữa course_id và tên lớp
const courseIdToNameMapping: { [key: number]: string } = {
  1: "K24HTTTB - IS52A",
  2: "K24HTTTB - IS57A",
  3: "K24HTTTB - IS22A",
  4: "K24HTTTB - IS28A",
  5: "K24HTTTB - IS29A",
  6: "K24CNTTA - IS22A",
  7: "K24CNTTA - IS28A",
};

export default function PendingExerciseRow({
  exercise,
  isSelected,
  onExerciseClick,
  onStartExercise,
}: PendingExerciseRowProps) {
  // Hàm để lấy tên lớp từ course_id
  const getCourseName = (courseId: number): string => {
    return courseIdToNameMapping[courseId] || `Khóa học ${courseId}`;
  };

  return (
    <>
      <tr
        className={`border-b cursor-pointer transition-all duration-200 ${
          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
        }`}
        onClick={() => onExerciseClick(exercise)}
      >
        <td className="p-2 text-sm">
          <div className="flex items-center justify-center">
            {exercise.pivot.is_active === 1 ? (
                <MdOutlineCheckBoxOutlineBlank size={18} />
            ) : (
                <MdOutlineCheckBox size={18} />
            )}
          </div>
        </td>
        <td className="p-2 text-sm text-blue-600 hover:underline">
          {exercise.title || "Chưa có tiêu đề"}
        </td>
        <td
          className={`p-2 text-sm ${
            exercise.level === "Cơ bản"
              ? "text-green-600"
              : exercise.level === "Trung cấp"
              ? "text-yellow-600"
              : exercise.level === "Nâng cao"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {exercise.level || "Không xác định"}
        </td>
        <td className="p-2 text-sm">
          {exercise.topics?.map((topic, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-xs px-2 py-1 rounded-full mr-1"
            >
              {topic}
            </span>
          )) || "Không có chủ đề"}
        </td>
        <td className="p-2 text-sm text-gray-600">
          <div className="flex items-center whitespace-nowrap">
            {exercise.pivot?.course_id
                ? getCourseName(exercise.pivot.course_id)
                : "Không có khóa học"}
            <BiChevronRight className="ml-1 text-gray-400" />
          </div>
        </td>
        <td className="p-2 text-sm text-gray-600">
          {exercise.pivot?.deadline
            ? new Date(exercise.pivot.deadline).toLocaleDateString("vi-VN")
            : "Không có hạn nộp"}
        </td>
      </tr>
      {isSelected && (
        <tr>
          <td colSpan={6} className="p-0">
            <div className="py-2 px-4 bg-white border-x border-b border-gray-100 transition-all duration-300">
              <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                {exercise.title || "Chưa có tiêu đề"}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Độ khó</p>
                  <p
                    className={`text-sm font-semibold ${
                      exercise.level === "Cơ bản"
                        ? "text-green-600"
                        : exercise.level === "Trung cấp"
                        ? "text-yellow-600"
                        : exercise.level === "Nâng cao"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {exercise.level || "Không xác định"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Khóa học</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {exercise.pivot?.course_id
                      ? getCourseName(exercise.pivot.course_id)
                      : "Không có khóa học"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Hạn nộp</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {exercise.pivot?.deadline
                      ? new Date(exercise.pivot.deadline).toLocaleDateString("vi-VN")
                      : "Không có hạn nộp"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Chủ đề</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {exercise.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    )) || <span className="text-gray-600">Không có chủ đề</span>}
                  </div>
                </div>
              </div>
              <button
                className="mt-2 w-full py-2 text-md bg-gradient-to-r from-blue-500 to-secondary text-white rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-md"
                onClick={() => onStartExercise(exercise.pivot?.course_id, exercise.pivot?.week_number)}
              >
                Làm bài ngay
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}