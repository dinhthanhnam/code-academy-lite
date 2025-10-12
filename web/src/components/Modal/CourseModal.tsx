import { useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import {Course} from "@/types/Course";
import {createCourse, updateCourse} from "@/utils/service/crud/CourseService";

interface CourseModalProps {
    onClose: () => void;
    selectedCourse?: Course;
    newCourse?: (course: Course) => void;
    updatedCourse?: (course: Course) => void;
    type: "create" | "update";
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export function CourseModal({ onClose, newCourse, updatedCourse, selectedCourse, type = "create" } : CourseModalProps) {
    const [payload, setPayload] = useState<Course>({
            course_code: selectedCourse?.course_code || "",
            name: selectedCourse?.name || ""
        },
    );

    const [message, setMessage] = useState<Message>({ message: null, success: null });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (id: keyof Course, value: string) => {
        setPayload((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (payload: Course) => {
        setIsSubmitting(true);
        try {
            let data;
            if (type === "create") {
                data = await createCourse(payload);
                // Nếu tạo mới thành công và có callback newCourse
                if (data.success && newCourse && data.data) {
                    newCourse(data.data);
                }
            } else {
                data = await updateCourse(selectedCourse!.id, payload);
                if (data.success && updatedCourse && data.data) {
                    updatedCourse(data.data);
                }
            }

            setMessage({message: data.message, success: data.success});
        } catch (error) {
            console.log(error);
            setMessage({message: "Đã xảy ra lỗi, vui lòng thử lại", success: false});
        } finally {
            setIsSubmitting(false);
        }
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
                        {type === "create" ? "Tạo học phần mới" : `Chỉnh sửa học phần ${selectedCourse.name}`}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Điền thông tin để {type === "create" ? "tạo" : "chỉnh sửa"} một học phần
                    </p>
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
                    <FormInput
                        type="text"
                        name="course_code"
                        label="Mã học phần"
                        placeholder="Ví dụ: IS57A"
                        value={payload.course_code}
                        onChange={(e) => handleChange("course_code", e.target.value)}
                    />
                    <FormInput
                        type="text"
                        name="name"
                        label="Tên học phần"
                        value={payload.name}
                        onChange={(e) => handleChange("name", e.target.value)}
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