import FormInput from "@/components/Form/FormInput";
import {BiRefresh} from "react-icons/bi";
import React, {useState} from "react";
import {customAlphabet} from "nanoid";

interface RefreshJoinCodeFormProps {
    value: string;
    onChange: (e: any) => void;
}

export default function RefreshJoinCodeForm ({value, onChange}: RefreshJoinCodeFormProps) {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 8);
    const [joinCode, setJoinCode] = useState<string>(value);
    function generateJoinCode() {
        return nanoid();
    }
    const handleRefreshJoinCode = () => {
        setJoinCode(generateJoinCode);
    };
    return (
        <div className="flex flex-row items-end w-full">
            <FormInput
                type="text"
                name="course_class_join_code"
                label="Mã tham gia"
                value={joinCode}
                onChange={onChange}
                className="w-3/4"
            />
            <div className={`p-2 w-1/4`}>
                <button
                    className="p-1 border border-secondary rounded-md hover:bg-gray-200 duration-200 ease-in-out"
                    onClick={handleRefreshJoinCode}
                >
                    <BiRefresh size={25} strokeWidth={0.2} color="#EF6622" />
                </button>
            </div>
        </div>
    );
}