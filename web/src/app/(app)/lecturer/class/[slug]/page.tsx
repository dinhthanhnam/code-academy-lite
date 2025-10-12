"use client";

import ClassProvider from "./ClassContext";
import ClassLayout from "./ClassLayout";

export default function LecturerClassDetailPage() {
    return (
        <ClassProvider>
            <ClassLayout />
        </ClassProvider>
    );
}