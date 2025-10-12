import React from "react";
import { HiOutlineSaveAs } from "react-icons/hi";

const ExerciseRow = ({ exercise, isSelected, onClick }) => {
  return (
    <>
      {/* Hàng chính hiển thị thông tin cơ bản */}
      <div
        className={`flex flex-row items-center p-4 border-b cursor-pointer transition-colors ${
          isSelected ? "bg-primary2" : "hover:bg-gray-50"
        }`}
        onClick={onClick}
      >
        <div className="w-1/12 text-sm text-center">{exercise.status}</div>
        <div className="w-4/12 font-medium text-blue-600 hover:underline text-center">
          {exercise.title}
        </div>
        <div
          className={`w-2/12 text-center ${
            exercise.difficulty === "Cơ bản"
              ? "text-green-600"
              : exercise.difficulty === "Trung cấp"
              ? "text-yellow-600"
              : exercise.difficulty === "Bài kiểm tra"
              ? "text-orange-600"
              : "text-red-600"
          }`}
        >
          {exercise.difficulty}
        </div>
        <div className="w-3/12 text-center">
          {exercise.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-xs px-2 py-1 rounded-full mr-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-2/12 font-medium text-blue-600 hover:underline text-center">
          {exercise.deadline || "N/A"}
        </div>
      </div>

      {/* Nội dung chi tiết khi được chọn */}
      {isSelected && (
        <div className="p-4 bg-gray-100 transition-all duration-300 ease-in-out">
          <div className="relative">
            <h3 className="font-bold mb-2">Đề bài</h3>
            {exercise.problems.map((problem, index) => (
              <div key={index} className="mb-4 relative">
                <p className="font-medium mb-2">{problem.description}</p>
                <p className="font-bold">Ví dụ:</p>
                <p className="mt-1">
                  <span className="font-medium">Input:</span> {problem.input}
                </p>
                <p>
                  <span className="font-medium">Output:</span> {problem.output}
                </p>
                <div className="absolute bottom-0 right-0">
                  <button className="p-1 rounded-full bg-gray-200 text-black transition-all duration-200 hover:scale-110 hover:bg-gray-300 hover:text-black">
                    <HiOutlineSaveAs size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseRow;