"use client";

import { useState } from "react";

export default function ClassHeader({ courseClass }: { courseClass: any }) {
    const [copied, setCopied] = useState(false);

    return (
        <div className="flex flex-row w-full border border-secondary p-4 rounded-md bg-white shadow-sm">
            {/* Phần tiêu đề và mô tả */}
            <div className="flex-grow">
                <h1 className="text-2xl font-bold text-primary">
                    {courseClass.name}
                    <span className="text-sm font-semibold text-secondary ml-2">
                        ({courseClass.course_class_code})
                    </span>
                </h1>
                <p className="text-gray-500 mt-1">{courseClass?.description}</p>
            </div>

            {/* Phần mã tham gia */}
            <div className="w-64 pl-4 border-l border-secondary flex flex-col justify-center">
                <div className="flex items-center gap-2 w-full h-full">
                    <p className="text-sm text-gray-600 whitespace-nowrap">Mã tham gia:</p>
                    <div className="flex-grow group relative h-full">
                        <p
                            className="w-30 h-14 bg-gray-100 text-gray-800 font-mono text-lg px-2 rounded-md border border-secondary hover:bg-gray-200 transition-colors flex items-center justify-items-center"
                        >
                            {courseClass.course_class_join_code}
                        </p>
                        <span className="tooltip">
                            {copied ? "Đã sao chép!" : "Nhấp để sao chép"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}