import { useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import {User} from "@/types/User";
import {createLecturer, updateLecturer} from "@/utils/service/crud/LecturerService";

interface LecturerModalProps {
    onClose: () => void;
    selectedLecturer?: User;
    newLecturer?: (course: User) => void;
    updatedLecturer?: (course: User) => void;
    type: "create" | "update";
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export function LecturerModal({ onClose, newLecturer, updatedLecturer, selectedLecturer, type = "create" } : LecturerModalProps) {
    const [payload, setPayload] = useState<User>({
        email: selectedLecturer?.email || "",
        name: selectedLecturer?.name || "",
        role: "lecturer",
        },
    );

    const [message, setMessage] = useState<Message>({ message: null, success: null });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (id: keyof User, value: string) => {
        setPayload((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (payload: User) => {
        setIsSubmitting(true);
        try {
            let data;
            if (type === "create") {
                data = await createLecturer(payload);
                // Nếu tạo mới thành công và có callback newLecturer
                if (data.success && newLecturer && data.data) {
                    newLecturer(data.data);
                }
            } else {
                data = await updateLecturer(selectedLecturer!.id, payload);
                if (data.success && updatedLecturer && data.data) {
                    updatedLecturer(data.data);
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
                        {type === "create" ? "Tạo giảng viên mới" : `Chỉnh sửa giảng viên ${selectedLecturer.name}`}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Điền thông tin để {type === "create" ? "tạo" : "chỉnh sửa"} giảng viên
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
                        name="email"
                        label="Email giảng viên"
                        placeholder="user@example.com"
                        value={payload.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {type === "create" && (
                        <FormInput
                            type="password"
                            name="password"
                            label="Mật khẩu"
                            value={payload.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                    )}

                    <FormInput
                        type="text"
                        name="name"
                        label="Tên giảng viên"
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