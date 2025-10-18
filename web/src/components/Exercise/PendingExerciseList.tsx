"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PendingExerciseRow from "@/components/Row/PendingExerciseRow";
import Exercise, { ExerciseListProps } from "@/types/Exercise";

export default function PendingExerciseList({ exercises = [], onSelectExercise }: ExerciseListProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  // Lọc và sắp xếp bài tập chưa hoàn thành
  const pendingExercises = exercises
    .sort((a, b) => {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return dateA - dateB; // Sắp xếp theo hạn nộp tăng dần
    })
    .map((e, idx) => ({index: idx ,...e}))
  ;


  const pendingCount = pendingExercises.length;

  // Xử lý khi nhấp vào bài tập
  const handleExerciseClick = (exercise: Exercise) => {
    const exerciseIndex = exercise.index; // Sử dụng id duy nhất của bài tập
    if (selected === exerciseIndex) {
      setSelected(null); // Bỏ chọn nếu đã chọn
      if (onSelectExercise) onSelectExercise(null);
    } else {
      setSelected(exerciseIndex); // Chọn bài tập mới
      if (onSelectExercise) onSelectExercise(exercise);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 flex-grow overflow-auto border-t-2 border-l-2 border-primary shadow-secondary">
      <div className="flex items-center justify-between m-2">
        <h2 className="text-md font-bold text-gray-800 flex items-center gap-2">
          Bài tập chưa hoàn thành
          <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
            {pendingCount}
          </span>
        </h2>
      </div>

      {pendingCount === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-md italic">Bạn đã hoàn thành tất cả bài tập! 🎉</p>
        </div>
      ) : (
        <div className="overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-bold rounded-t rounded-md">
                {/*<th className="p-2 text-center">Trạng thái</th>*/}
                <th className="p-2 text-center">Tên bài tập</th>
                <th className="p-2 text-center">Độ khó</th>
                <th className="p-2 text-center">Chủ đề</th>
                <th className="p-2 text-center">Khóa học</th>
                <th className="p-2 text-center">Hạn nộp</th>
              </tr>
            </thead>
            <tbody>
              {pendingExercises.map((exercise) => (
                <PendingExerciseRow
                  key={exercise.index}
                  exercise={exercise}
                  isSelected={selected === exercise.index}
                  onExerciseClick={handleExerciseClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}