"use client";
import { LinearProgress } from "@mui/material";
import {useAppSelector} from "@/app/redux/hooks";

export default function LoadingBar() {
    const isLoading = useAppSelector((state) => state.loading.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-50 overflow-hidden">
            <LinearProgress />
        </div>
    );
}
