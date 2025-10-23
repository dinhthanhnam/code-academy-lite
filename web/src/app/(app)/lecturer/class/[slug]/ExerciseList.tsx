"use client";

import { useState } from "react";
import { useClassContext } from "./ClassContext";
import CommonButton from "@/components/Common/CommonButton";
import AddExerciseModal from "./AddExerciseModal";
import ExerciseRow from "./ExerciseRow";
import CommonPagination from "@/components/Pagination/CommonPagination";
import Exercise from "@/types/Exercise";
import EditExerciseModal from "@/app/(app)/lecturer/class/[slug]/EditExerciseModal";

export default function ExerciseList() {
    const { exercises, fetchExercises } = useClassContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 flex flex-row justify-between border-b rounded-md">
                <h2 className="text-xl font-bold text-gray-800">Danh sách bài tập</h2>
                <CommonButton label="Thêm bài tập" onClick={handleOpenModal} />
            </div>

            {/* Table header */}
            <div className="flex flex-row p-4 bg-gray-200 font-bold text-gray-800 border-b">
                <div className="w-4/12 text-center">Tiêu đề</div>
                <div className="w-2/12 text-center">Độ khó</div>
                <div className="w-3/12 text-center">Dạng bài</div>
                <div className="w-2/12 text-center">Hạn nộp</div>
            </div>

            {/* Danh sách scroll được */}
            <div className="flex-1 overflow-y-auto px-2">
                {exercises?.data?.map((exercise: Exercise) => (
                    <ExerciseRow key={exercise.id} exercise={exercise} />
                ))}
            </div>

            {/* Pagination cố định bên dưới */}
            <div className="border-t px-4 py-3 bg-white">
                <CommonPagination meta={exercises?.meta} onPageChange={fetchExercises} />
            </div>

            {/* Modal */}
            {isModalOpen && <AddExerciseModal onClose={handleCloseModal} />}
        </div>
    );
}
