"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useDevice } from "@/hooks/useDevice";
import { Course } from "@/types/Course";
import CommonButton from "@/components/Common/CommonButton";
import CourseRow from "@/components/Row/CourseRow";
import CommonSearch from "@/components/Common/CommonSearch";
import { getCourses } from "@/utils/service/crud/CourseService";
import { PaginatedCourse } from "@/types/paginated/PaginatedCourse";
import { SyncLoader } from "react-spinners";
import CourseClassContainer from "@/components/Admin/Course/CourseClassContainer";
import CommonPagination from "@/components/Pagination/CommonPagination";
import {CourseModal} from "@/components/Modal/CourseModal";
import {CourseClassModal} from "@/components/Modal/CourseClassModal";

interface CourseModal {
    active: boolean | null;
    type: "create" | "update";
}

interface SelectedCourseProps {
    payload: Course | null;
    action: "modal" | "relation" | null;
}

export default function AdminManagementCoursePage() {
    const [courses, setCourses] = useState<PaginatedCourse | null>(null);
    const [courseModal, setCourseModal] = useState<CourseModal>({active: null, type: "create"});
    const [courseClassModal, setCourseClassModal] = useState<boolean | null>();
    const [search, setSearch] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<SelectedCourseProps>({payload: null, action: null});
    const [loading, setLoading] = useState<boolean>(true);
    const { isMobile } = useDevice();

    const fetchCourses = async (page = 1, query?: string | null) => {
        setLoading(true);
        const data = await getCourses(page, query);
        setCourses(data);
        setLoading(false);
    };

    const handleSearch = () => {
        fetchCourses(1, search);
    };

    useEffect(() => {
        if (search === "") {
            fetchCourses(1, null);
        }
    }, [search]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleNewCourse = (course: Course) => {
        if (courses && courses.data) {
            setCourses({
                ...courses,
                data: [course, ...courses.data]
            });
        } else {
            fetchCourses();
        }
    };

    const handleCourseUpdated = (updatedCourse: Course) => {
        if (courses && courses.data) {
            setCourses({
                ...courses,
                data: courses.data.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
            });
        }
    };

    const handleCourseDeleted = (courseId: number) => {
        if (courses && courses.data) {
            setCourses({
                ...courses,
                data: courses.data.filter((c) => c.id !== courseId),
            });
        }
    };

    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            {/* Course List */}
            <div className={`bg-white p-2 rounded-lg shadow border border-secondary flex flex-col flex-grow ${isMobile ? "w-full" : "w-1/3"}`}>
                <div className="flex flex-row gap-2 p-2 justify-between items-center flex-shrink-0">
                    <CommonSearch
                        key="search_course"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSearch}
                    />
                    <CommonButton onClick={() => setCourseModal({ active: true, type: "create" })}
                                  icon={Plus}
                                  label="Thêm học phần"
                    />
                </div>

                <div className="flex flex-col flex-grow overflow-hidden p-2">
                    <div className="border border-secondary p-2 rounded-md flex flex-col flex-grow overflow-hidden">
                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                            </div>
                        ) : courses?.data ? (
                            <div className="flex flex-col h-full">
                                {/* Phần chứa CourseRow */}
                                <div className="overflow-y-auto flex-grow min-h-0">
                                    {courses.data.map((course) => (
                                        <div key={course.id} className="py-1">
                                            <CourseRow
                                                course={course}
                                                selected={selectedCourse?.payload?.id === course.id}
                                                onSelect={() => setSelectedCourse({payload: course, action: "relation"})}
                                                onDelete={handleCourseDeleted}
                                                onAdd={() =>
                                                {
                                                    setCourseClassModal(true);
                                                    setSelectedCourse({payload: course, action: "modal"});
                                                }}
                                                onEdit={() =>
                                                {
                                                    setCourseModal({active: true, type: "update"});
                                                    setSelectedCourse({payload: course, action: "modal"});
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                <div className="mt-2 flex-shrink-0">
                                    <CommonPagination
                                        meta={courses.meta}
                                        onPageChange={(page) => fetchCourses(page, search)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-center text-gray-500">Không có dữ liệu.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Course Class List */}
            <div className={`bg-white p-2 rounded-lg shadow flex border flex-grow border-secondary ${isMobile ? "w-full" : "w-2/3"}`}>
                <CourseClassContainer parentCourse={selectedCourse?.action === 'relation' ? selectedCourse?.payload : null } deselectCourse={() => setSelectedCourse(null)}/>
            </div>

            {/* Edit/Create Course Modal*/}
            {courseModal.active && (
                <CourseModal
                    onClose={() => setCourseModal({...courseModal, active: false})}
                    type={courseModal.type}
                    newCourse={handleNewCourse}
                    updatedCourse={handleCourseUpdated}
                    selectedCourse={selectedCourse.payload}
                />
            )}

            {courseClassModal && (
                <CourseClassModal
                    type={'create'}
                    onClose={() => setCourseClassModal(false)}
                    parentCourse={ selectedCourse?.action === "modal" ? selectedCourse.payload : null }
                />
            )}
        </div>
    );
}
