import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface CommonSearchProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
    className?: string;
    placeholder?: string;
}

export default function CommonSearch({ value, onSubmit, onChange, className, placeholder }: CommonSearchProps) {
    const [prevValue, setPrevValue] = useState(value);

    // Hàm xử lý sự kiện Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSubmit) {
            e.preventDefault();
            onSubmit();
        }
    };

    // Khi xóa hết input, tự động gọi API không có `search`
    useEffect(() => {
        if (prevValue !== "" && value === "" && onSubmit) {
            onSubmit();
        }
        setPrevValue(value);
    }, [value, prevValue, onSubmit]);

    return (
        <div className="flex items-center gap-2">
            <div className={`${className} relative flex-grow`}>
                <input
                    type="text"
                    placeholder={placeholder || "Tìm kiếm..."}
                    className="w-full p-2 pl-8 border rounded focus:ring ring-primary !outline-1 !outline-secondary text-sm"
                    value={value ?? ""}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={16} strokeWidth={2.2} />
            </div>
        </div>
    );
}
