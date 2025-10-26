"use client";

import Exercise from "@/types/Exercise";
import {Pencil, Trash2} from "lucide-react";
import {useState} from "react";
import EditExerciseModal from "@/app/(app)/lecturer/class/[slug]/EditExerciseModal";
import {lecturerDeleteCourseClassExercise} from "@/utils/service/crud/LecturerService";

interface ExerciseDetailProps {
    exercise: Exercise;
}

export default function ExerciseDetail({ exercise }: ExerciseDetailProps) {
    if (!exercise) {
        return <p className="text-gray-600">Chọn bài tập để xem chi tiết</p>;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Parse test_cases từ chuỗi JSON
    const testCases = exercise.test_cases;
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleDeleteExercise = async () => {
        if(!window.confirm("Bạn có chắc chắn muốn xoá?")) return;
        await lecturerDeleteCourseClassExercise(exercise.id);
    }
    return (
        <>
            {isModalOpen && <EditExerciseModal exercise={exercise} onClose={handleCloseModal} />}
            <div className="space-y-6 overflow-y-auto">
                {/* Tiêu đề và mô tả */}
                <div>
                    <div className={`flex flex-row gap-2 items-center justify-end`}>
                        <div
                            className={`cursor-pointer p-1 rounded-md hover:bg-blue-200 duration-200 transition-all`}
                            onClick={handleOpenModal}
                        >
                            <Pencil color={'blue'} height={20} width={20}/>
                        </div>
                        <div className={`cursor-pointer p-1 rounded-md hover:bg-red-200 duration-200 transition-all`}
                             onClick={handleDeleteExercise}
                        >
                            <Trash2 color={'red'} height={20} width={20}/>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{exercise.title}</h2>
                    <p className="text-gray-600">{exercise.description}</p>
                </div>

                {/* Thông tin cơ bản */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="font-medium text-gray-700">Độ khó: </span>
                        <span className="capitalize text-gray-600">{exercise.level}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Ngôn ngữ: </span>
                        <span className="text-gray-600">{exercise.language}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Thời gian giới hạn: </span>
                        <span className="text-gray-600">{exercise.time_limit} giây</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Bộ nhớ giới hạn: </span>
                        <span className="text-gray-600">{exercise.memory_limit} MB</span>
                    </div>
                </div>

                {/* Topics */}
                <div>
                    <span className="font-medium text-gray-700">Chủ đề: </span>
                    <div className="flex gap-2 mt-1">
                        {exercise.topics.map((topic: string, index: number) => (
                            <span
                                key={index}
                                className="inline-block bg-primary2/10 text-primary2 px-2 py-1 rounded-md text-sm"
                            >
                            {topic}
                        </span>
                        ))}
                    </div>
                </div>

                {/* Ví dụ */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Ví dụ</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="font-mono text-sm text-gray-700">
                            <span className="font-medium">Input: </span>
                            {exercise.example_input}
                        </p>
                        <p className="font-mono text-sm text-gray-700 mt-1">
                            <span className="font-medium">Output: </span>
                            {exercise.example_output}
                        </p>
                    </div>
                </div>

                {/* Test cases */}
                {testCases.length > 0 && (
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Test Cases</h3>
                        <div className="space-y-3">
                            {testCases.map((test: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-mono text-sm text-gray-700">
                                        <span className="font-medium">Stdin: </span>
                                        {test.stdin}
                                    </p>
                                    <p className="font-mono text-sm text-gray-700 mt-1">
                                        <span className="font-medium">Expected_output: </span>
                                        {test.expected_output}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Thông tin pivot */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Thông tin khóa học</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="font-medium text-gray-700">Tuần: </span>
                            <span className="text-gray-600">{exercise.pivot?.week_number}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Hạn nộp: </span>
                            <span className="text-gray-600">{exercise.pivot?.deadline || "Không có"}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Trạng thái: </span>
                            <span className="text-gray-600">{exercise.pivot?.is_active ? "Hoạt động" : "Không hoạt động"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}