"use client"; // Đảm bảo chạy phía client vì window không tồn tại trên server

import { useEffect } from "react";
import { setDeviceType } from "@/app/redux/slices/deviceSlice";
import {useAppDispatch} from "@/app/redux/hooks";

export default function DeviceDetector() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkDevice = () => {
            dispatch(setDeviceType(window.innerWidth < 768));
        };

        checkDevice(); // Kiểm tra khi load trang
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, [dispatch]);

    return null; // Không render gì cả, chỉ chạy logic
}
