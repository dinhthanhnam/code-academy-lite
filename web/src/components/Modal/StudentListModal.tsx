import { useState, useEffect } from 'react';
import { X } from "lucide-react";
import { CourseClass } from "@/types/CourseClass";
import { PaginatedUser } from "@/types/paginated/PaginatedUser";
import StudentList from "@/app/(app)/admin/management/course/StudentList";
import { getCourseClassStudents } from "@/utils/service/api/getCourseExercises";

interface StudentListModalProps {
    onClose: () => void;
    selectedCourseClass?: CourseClass;
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export function StudentListModal({ onClose, selectedCourseClass }: StudentListModalProps) {
    const [message, setMessage] = useState<Message>({ message: null, success: null });
    const [students, setStudents] = useState<PaginatedUser | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch students based on selectedCourseClass.slug
    const fetchCourseClassStudents = async (slug: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getCourseClassStudents(slug);
            setStudents(response);
        } catch (err) {
            console.error("Error fetching students:", err);
            setError("Không thể tải danh sách sinh viên");
            setMessage({ message: "Không thể tải danh sách sinh viên", success: false });
        } finally {
            setLoading(false);
        }
    };

    // Fetch students when selectedCourseClass changes
    useEffect(() => {
        if (selectedCourseClass?.slug) {
            fetchCourseClassStudents(selectedCourseClass.slug);
        } else {
            setStudents(null);
            setError("Không có lớp học phần được chọn");
            setMessage({ message: "Không có lớp học phần được chọn", success: false });
        }
    }, [selectedCourseClass]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-7xl relative shadow-lg border border-secondary">
                {/* Nút X */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X size={24} strokeWidth={2} />
                </button>

                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Danh sách sinh viên lớp học phần {selectedCourseClass?.name || "Không xác định"}
                    </h2>
                </div>

                {/* Message Display */}
                {message.message && (
                    <div className="p-2">
                        <div
                            className={`p-2 rounded border text-sm ${
                                message.success
                                    ? "bg-green-100 text-green-700 border-green-500"
                                    : "bg-red-100 text-red-700 border-red-500"
                            }`}
                        >
                            {message.message}
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="p-4 text-center text-gray-600">Đang tải danh sách sinh viên...</div>
                )}

                {/* Error State */}
                {!loading && error && !students?.data?.length && (
                    <div className="p-4 text-center text-red-600">{error}</div>
                )}

                {/* Student List */}
                {!loading && !error && (
                    <StudentList students={students} />
                )}
            </div>
        </div>
    );
}