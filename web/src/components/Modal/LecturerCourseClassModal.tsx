import { useState } from 'react';
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import {assignClass, LecturerClass} from "@/utils/service/crud/LecturerCourseClassService";
import {User} from "@/types/User";
import FormSelect from "@/components/Form/FormSelect";
import {useFetchCourseClassOptions, useFetchLecturerOptions} from "@/hooks/useFetchOptions";

interface LecturerCourseClassModalProps {
    onClose: () => void;
    selectedLecturer: User;
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export function LecturerCourseClassModal({ selectedLecturer, onClose } : LecturerCourseClassModalProps) {
    const { courseClassOptions } = useFetchCourseClassOptions();
    const { lecturerOptions } = useFetchLecturerOptions();
    const [payload, setPayload] = useState<LecturerClass>({
            course_class_id: null,
            lecturer_id: selectedLecturer.id
        },
    );

    const [message, setMessage] = useState<Message>({ message: null, success: null });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (id: keyof LecturerClass, value: string) => {
        setPayload((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (payload) => {
        setIsSubmitting(true);
        try {
            const data: any = await assignClass(payload);
            setMessage({message: data.message, success: data.success});
        } catch (error) {
            console.log(error);
            setMessage({message: "Đã xảy ra lỗi, vui lòng thử lại", success: false});
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderOptions = (Options: any) => {
        const options = Options?.map(option => ({
            value: option.value,
            label: option.label
        })) || [];
        return [{ value: 0, label: "-- Chọn --" }, ...options];
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-lg border border-secondary">
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
                        Giao lớp học phần
                    </h2>
                </div>

                {message.message && (
                    <div className={`p-2`}>
                        <div
                            className={`p-2 rounded border text-sm ${
                                message.success ? "bg-green-100 text-green-700 border-green-500" : "bg-red-100 text-red-700 border-red-500"
                            }`}
                        >
                            {message.message}
                        </div>
                    </div>
                )}

                {/* Form content */}
                <div className="grid grid-cols-2 gap-2">
                    <FormSelect
                        name="lecturer"
                        label="Giảng viên"
                        value={payload.lecturer_id?.toString() || ""}
                        options={renderOptions(lecturerOptions)}
                        onChange={(e) => handleChange("lecturer_id", e.target.value)}
                        disable={!!selectedLecturer}
                    />
                    <FormSelect
                        name="course_class_code"
                        label="Mã học phần"
                        value={payload.course_class_id?.toString() || ""}
                        options={renderOptions(courseClassOptions)}
                        onChange={(e) => handleChange("course_class_id", e.target.value)}
                    />
                </div>

                {/* Button */}
                <div className="flex justify-end mt-4 p-2">
                    <CommonButton
                        label={isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                        onClick={async () => await handleSubmit(payload)}
                    />
                </div>
            </div>
        </div>
    );
}