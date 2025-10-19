import { useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import {User} from "@/types/User";
import {createUser, updateUser} from "@/utils/service/crud/UserService";
import FormSelect from "@/components/Form/FormSelect";

interface UserModalProps {
    onClose: () => void;
    selectedUser?: User;
    updatedUser?: (course: User) => void;
    type: "create" | "update";
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export default function UserModal({ onClose, updatedUser, selectedUser, type = "create" } : UserModalProps) {
    const [payload, setPayload] = useState<User>({
            email: selectedUser?.email || "",
            name: selectedUser?.name || "",
            role: selectedUser?.role || "",
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
                data = await createUser(payload);
            } else {
                data = await updateUser(selectedUser!.id, payload);
                if (data.success && updatedUser && data.data) {
                    updatedUser(data.data);
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
                        Chỉnh sửa người ${selectedUser?.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Điền thông tin để {type === "create" ? "tạo" : "chỉnh sửa"} người dùng
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
                        label="Email người dùng"
                        placeholder="user@example.com"
                        value={payload.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />

                    <FormInput
                        type="text"
                        name="name"
                        label="Tên người dùng"
                        value={payload.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <FormSelect
                        name="role"
                        label="Vai trò"
                        options={[
                            {value: "lecturer", label: "Giảng viên"},
                            {value: "student", label: "Sinh viên"},
                            {value: "admin", label: "Admin"}
                        ]}
                        value={payload.role}
                        onChange={(e) => handleChange("role", e.target.value)}
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