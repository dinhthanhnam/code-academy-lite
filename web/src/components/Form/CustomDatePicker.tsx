import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
    label?: string;
    selected: Date | null;
    onChange: (date: Date | null) => void;
    name?: string;
    placeholder?: string;
    disable?: boolean;
    className?: string;
}

export default function CustomDatePicker({
                                             label,
                                             selected,
                                             onChange,
                                             name,
                                             placeholder,
                                             disable = false,
                                             className = "",
                                         }: CustomDatePickerProps) {
    return (
        <div className={`${className} flex flex-col p-2`}>
            {label && (
                <label className="block font-bold justify-self-start text-md">{label}</label>
            )}
            <DatePicker
                selected={selected}
                onChange={onChange}
                name={name}
                placeholderText={placeholder}
                disabled={disable}
                className="p-2 rounded focus:ring focus:ring-primary border text-sm border-secondary outline-secondary w-full"
                dateFormat="dd/MM/yyyy HH:mm:ss"
                showTimeSelect
                timeFormat="HH:mm:ss"
                timeIntervals={30}
            />
        </div>
    );
}