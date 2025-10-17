"use client";
import { BiChevronUp } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { LogoutUser } from "@/utils/service/AuthService";
import { useRouter } from "next/navigation";
import { showMessage } from "@/app/redux/slices/messageSlice";
import {useAppDispatch} from "@/app/redux/hooks";

export default function ProfileHolder() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            const response = await LogoutUser();
            dispatch(showMessage({ message: response.message || "Đăng xuất thành công!", success: true }));
        } catch (error) {
            dispatch(showMessage({ message: "Đăng xuất thất bại!", success: false }));
        }
        router.push("/login");
    };

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex flex-row-reverse items-center cursor-pointer" ref={dropdownRef}>
            {/* Chevron */}
            <div
                className="p-1 rounded-full duration-200 hover:bg-primary2 hover:text-primary"
                onClick={() => setOpen(!open)}
            >
                <BiChevronUp
                    size={24}
                    strokeWidth={0.2}
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </div>

            {/* User Icon (Toggle Dropdown) */}
            <div
                className="p-1 rounded-full duration-200 hover:bg-primary2 hover:text-primary cursor-pointer group relative"
                onClick={() => setOpen(!open)}
            >
                <FaUserCircle size={28} strokeWidth={1.2} />
                <span className="tooltip">Thông tin cá nhân</span>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="select-none absolute top-12 right-0 w-40 bg-white shadow-lg rounded-lg p-2 transition-all duration-300 z-50">
                    <ul className="text-sm text-gray-800">
                        <li
                            className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
