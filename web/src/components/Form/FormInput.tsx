import {ChangeEvent} from "react";
import {IconType} from "react-icons";

// Define the props interface for AuthFormInput
interface FormInputProps {
    type: "text" | "email" | "password" | "number" | "tel" | "url"; // Add more input types as needed
    label?: string;
    value?: string; // Optional, since it might not always be controlled
    name: string;
    placeholder?: string; // Optional
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    disable?: boolean;
    className?: string;
    readOnly?: boolean;
}

export default function FormInput({
                                      type,
                                      label,
                                      value,
                                      name,
                                      placeholder,
                                      onChange,
                                      disable,
                                      className,
                                      readOnly,
                                  }: FormInputProps) {
    return (
        <div className={`${className} flex flex-col p-2`}>
            {label && (
                <label className="block font-bold justify-self-start text-md">{label}</label>
            )}
            <input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disable}
                readOnly={readOnly}
                className="p-2 rounded focus:ring focus:ring-primary border text-sm border-secondary outline-secondary"
            />
        </div>
    );
}