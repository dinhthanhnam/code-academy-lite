"use client";

import { useClassContext } from "./ClassContext";
import { Code, Upload, Users, BarChart2 } from "lucide-react";
import {BiDetail} from "react-icons/bi";

export default function VerticalTabs() {
    const { activeTab, setActiveTab } = useClassContext();

    return (
        <div className="w-16 bg-gray-50 flex flex-col items-center py-4 gap-3 border-r border-secondary m-1">
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-md group relative ${
                    activeTab === "detail"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-800 hover:bg-primary2"
                }`}
                onClick={() => setActiveTab("detail")}
            >
                <BiDetail size={20} />
                <span className="tooltip z-50">Chi tiết</span>
            </button>
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-md group relative ${
                    activeTab === "submissions"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-800 hover:bg-primary2"
                }`}
                onClick={() => setActiveTab("submissions")}
            >
                <Upload size={20} />
                <span className="tooltip z-50">Xem nội dung nộp bài</span>
            </button>
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-md group relative ${
                    activeTab === "students"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-800 hover:bg-primary2"
                }`}
                onClick={() => setActiveTab("students")}
            >
                <Users size={20} />
                <span className="tooltip z-50">Xem danh sách sinh viên</span>
            </button>
        </div>
    );
}