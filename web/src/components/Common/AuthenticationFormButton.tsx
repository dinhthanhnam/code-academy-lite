import {FormEvent} from "react";

interface AuthenticationFormButtonProps {
    label?: string;
    onClickAction: (e: FormEvent<HTMLButtonElement>) => void; // Đổi tên từ "onClick" -> "onClickAction"
}

export default function AuthenticationFormButton({ label, onClickAction }: AuthenticationFormButtonProps) {
    return (
        <button
            onClick={onClickAction} // Cập nhật tên prop ở đây
            className="bg-gray-50 rounded-md border border-secondary px-4 py-2 inline-flex items-center hover:bg-primary2 duration-200"
        >
            {label}
        </button>
    );
}
