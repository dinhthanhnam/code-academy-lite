import { ChangeEvent } from "react";

// Define the props interface for AuthFormInput
interface FormInputProps {
    type: "text" | "email" | "password" | "number" | "tel" | "url"; // Add more input types as needed
    label?: string;
    value?: string; // Optional, since it might not always be controlled
    name: string;
    placeholder?: string; // Optional
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthFormInput({
                                      type,
                                      label,
                                      value,
                                      name,
                                      placeholder,
                                      onChange,
                                  }: FormInputProps) {
    return (
        <div className="flex flex-col p-2">
            {label && (
                <label className="block font-bold justify-self-start">{label}</label>
            )}
            <input
                title={`auth-form-input-${label}`}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="p-2 rounded focus:ring focus:ring-primary border border-secondary outline-secondary"
            />
        </div>
    );
}