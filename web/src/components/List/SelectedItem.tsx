import React, {FormEvent} from "react";
import {IconType} from "react-icons";

interface SelectedItemProps {
    label?: string;
    onClick: () => void; // Đổi tên từ "onClick" -> "onClickAction"
    children?: React.ReactNode;
    icon?: IconType;
}

export default function SelectedItem({ label, onClick, icon: Icon }: SelectedItemProps) {
    return (
        <button
            // onClick={onClick}
            className="rounded-md border border-secondary
            p-2 inline-flex items-center gap-2 text-black hover:bg-secondary2 ease-in-out duration-200"
        >
            {Icon && <Icon size={20} strokeWidth={2} onClick={onClick}/>}
            {label && <span className="text-sm whitespace-nowrap">{label}</span>}
        </button>
    );
}
