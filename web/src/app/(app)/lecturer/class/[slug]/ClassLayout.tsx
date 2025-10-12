"use client";

import { useClassContext } from "./ClassContext";
import ExerciseList from "./ExerciseList";
import VerticalTabs from "./VerticalTabs";
import TabContent from "./TabContent";
import ClassHeader from "@/app/(app)/lecturer/class/[slug]/ClassHeader";

export default function ClassLayout() {
    const { loading, error, courseClass } = useClassContext();

    if (loading) return <div className="h-full flex items-center justify-center">Đang tải dữ liệu...</div>;
    if (error) return <div className="h-full flex items-center justify-center">{error}</div>;
    if (!courseClass) return <div className="h-full flex items-center justify-center">Không tìm thấy lớp cho giảng viên</div>;

    return (
        <div className="flex flex-grow flex-col gap-2 overflow-hidden">
            <ClassHeader courseClass={courseClass}></ClassHeader>
            <div className="flex flex-grow flex-row overflow-hidden">
                <div className="flex flex-1 overflow-hidden gap-2">
                    <div className="w-1/2 bg-white border border-secondary rounded-md">
                        <ExerciseList />
                    </div>
                    <div className="w-1/2 flex flex-row border border-secondary rounded-md bg-white">
                        <VerticalTabs />
                        <TabContent />
                    </div>
                </div>
            </div>
        </div>
    );
}