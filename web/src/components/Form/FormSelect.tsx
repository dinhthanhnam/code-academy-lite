import { ChangeEvent } from "react";
import { CustomOption } from "@/utils/service/OptionService";

interface FormSelectProps {
    label?: string;
    value?: number | string;
    name: string;
    options: CustomOption[];
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void; // Chỉ dành cho select
    disable?: boolean;
    className?: string;
}

export default function FormSelect({
                                       label,
                                       value = "",
                                       name,
                                       options,
                                       placeholder,
                                       onChange,
                                       disable = false,
                                       className = "",
                                   }: FormSelectProps) {
    return (
        <div className={`${className} flex flex-col p-2`}>
            {label && (
                <label className="block font-bold justify-self-start text-md">{label}</label>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disable}
                className="p-2 rounded focus:ring focus:ring-primary border text-sm border-secondary outline-secondary"
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}