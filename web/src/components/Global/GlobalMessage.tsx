"use client";

import { useEffect } from "react";
import { hideMessage } from "@/app/redux/slices/messageSlice";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";

const GlobalMessage = () => {
    const dispatch = useAppDispatch();
    const { message, success, visible } = useAppSelector((state) => state.message);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideMessage());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visible, dispatch]);

    if (!visible) return null;

    return (
        <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-3 px-6 rounded-full transition-all duration-300 ease-in-out z-50 border ${
                success
                    ? "bg-green-200 text-green-800 border-green-500"
                    : "bg-red-200 text-red-800 border-red-500"
            }`}
        >
            {message}
        </div>
    );
};

export default GlobalMessage;
