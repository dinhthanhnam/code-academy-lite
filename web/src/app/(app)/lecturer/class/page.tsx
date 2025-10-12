"use client";
import { useDevice } from "@/hooks/useDevice";
import CommonSearch from "@/components/Common/CommonSearch";
import { useEffect, useState } from "react";
import CommonPagination from "@/components/Pagination/CommonPagination";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import {getCourseClasses, getCourseClassesForLecturer} from "@/utils/service/crud/CourseClassService";
import { PaginatedCourseClass } from "@/types/paginated/PaginatedCourseClass";
import CourseContainer from "@/components/Common/CourseContainer";

export default function LecturerClassPage() {
    const { isMobile } = useDevice();
    const router = useRouter();
    const [search, setSearch] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [coursesClasses, setCourseClasses] = useState<PaginatedCourseClass | null>(null);

    const fetchCourseClasses = async (page = 1, query?: string | null) => {
        setLoading(true);
        const data = await getCourseClassesForLecturer(page, query);
        setCourseClasses(data);
        setLoading(false);
    };

    const handleSearch = () => {
        fetchCourseClasses(1, search);
    };

    useEffect(() => {
        if (search === "") {
            fetchCourseClasses(1, null);
        }
    }, [search]);

    useEffect(() => {
        fetchCourseClasses();
    }, []);

    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            <div className="bg-white p-2 rounded-lg shadow border border-secondary flex flex-col flex-grow w-full">
                <div className="flex justify-between items-center mb-4">
                    <CommonSearch
                        className="max-w-2xl"
                        key="search_lecturer_class"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSearch}
                    />
                </div>
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                    </div>
                ) : coursesClasses?.data?.length ? (
                    <div className="flex flex-col flex-grow">
                        <div className="grid grid-cols-4 gap-6 w-full p-4">
                            {coursesClasses.data.map((course) => (
                                <CourseContainer key={course.id} courseClass={course} referencePath={'/lecturer/class'} />
                            ))}
                        </div>
                        <div className="mt-auto p-4 flex justify-center">
                            <CommonPagination meta={coursesClasses.meta} onPageChange={(page) => fetchCourseClasses(page)} />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-center text-gray-500">Không có dữ liệu.</p>
                    </div>
                )}
            </div>
        </div>
    );
}