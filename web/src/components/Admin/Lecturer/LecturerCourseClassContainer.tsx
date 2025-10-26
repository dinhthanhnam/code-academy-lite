import { User } from "@/types/User";
import { CourseClass } from "@/types/CourseClass";
import CommonSearch from "@/components/Common/CommonSearch";
import CommonButton from "@/components/Common/CommonButton";
import { Plus, X } from "lucide-react";
import { useEffect, useState} from "react";
import {PaginatedCourseClass} from "@/types/paginated/PaginatedCourseClass";
import {SyncLoader} from "react-spinners";
import CourseClassRow from "@/components/Row/CourseClassRow";
import CommonPagination from "@/components/Pagination/CommonPagination";
import SelectedItem from "@/components/List/SelectedItem";
import {getCourseClassesByLecturer} from "@/utils/service/crud/LecturerService";
import {getCourseClasses} from "@/utils/service/crud/CourseClassService";
import {detachClass, LecturerClass} from "@/utils/service/crud/LecturerCourseClassService";
import {showMessage} from "@/app/redux/slices/messageSlice";
import {useAppDispatch} from "@/app/redux/hooks";

interface LecturerCourseClassContainerProps {
    parentLecturer?: User;
    deselectLecturer?: () => void;
}

interface SelectedCourseClassProps {
    payload: CourseClass | null;
    action: "modal" | "relation" | null;
}

export default function LecturerCourseClassContainer({parentLecturer = null, deselectLecturer}: LecturerCourseClassContainerProps) {
    const dispatch = useAppDispatch();
    const [lecturerCourseClasses, setLecturerCourseClasses] = useState<PaginatedCourseClass | null>(null);
    const [selectedCourseClass, setSelectedCourseClass] = useState<SelectedCourseClassProps>({payload: null, action: null});
    const [search, setSearch] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCourseClasses = async (page = 1, search?: string) => {
        let data;
        if (parentLecturer) {
            setLoading(true);
            data = await getCourseClassesByLecturer(page, parentLecturer.id, search);
            setLecturerCourseClasses(data);
            setLoading(false);
        } else {
            setLoading(true);
            data = await getCourseClasses(page, search);
            setLecturerCourseClasses(data);
            setLoading(false);
        }
    };

    const handleDetachCourseClass =  async (detachedCourse: CourseClass) => {
        if (!parentLecturer) {
            alert("Chọn một giảng viên trước khi thực hiện gỡ lớp học phần");
        }

        const detachPayload: LecturerClass = {lecturer_id: parentLecturer?.id, course_class_id: detachedCourse?.id}
        if (window.confirm(`Bạn có chắc muốn gỡ lớp học phần "${detachedCourse.name}"?`)) {
            try {
                const res: any = await detachClass(detachPayload);

                if (res.success) {
                    setLecturerCourseClasses({
                        ...lecturerCourseClasses,
                        data: lecturerCourseClasses.data.filter((c) => c.id !== detachedCourse.id),
                    });
                }

                dispatch(showMessage({message: res.message, success: res.success}));
            } catch (error) {
                console.error("Lỗi detach class", error);
            }
        }


    }

    const handleSearch = async (page = 1) => {
        fetchCourseClasses(page, search);
    };
    useEffect(() => {
        fetchCourseClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentLecturer?.id]);

    return (
        <div className="flex flex-col w-full h-full">
            {/* Phần header - Search và Button */}
            <div className="flex gap-2 p-2 justify-between items-center flex-shrink-0">
                <CommonSearch
                    key="search_lecturer_classes"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onSubmit={handleSearch}
                />
                {/*<CommonButton onClick={() => console.log("Thêm lớp học phần cho giảng viên")} icon={Plus} label=" giảng viên" />*/}
            </div>

            {/* Selected Item - nếu có */}
            {parentLecturer && deselectLecturer && (
                <div className="px-2 flex-shrink-0">
                    <SelectedItem onClick={deselectLecturer} icon={X} label={`Hủy chọn ${parentLecturer.name}`} />
                </div>
            )}

            {/* Phần nội dung chính */}
            <div className="flex-grow flex flex-col overflow-hidden">
                {lecturerCourseClasses ? (
                    <div className="p-2 flex-grow flex flex-col overflow-hidden">
                        <div className="border border-secondary p-2 rounded-md flex flex-col flex-grow overflow-hidden">
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                                </div>
                            ) : lecturerCourseClasses.data && lecturerCourseClasses.data.length > 0 ? (
                                <div className="flex flex-col h-full">
                                    {/* Phần danh sách CourseClassRow với thanh cuộn */}
                                    <div className="overflow-y-auto flex-grow" style={{ minHeight: 0 }}>
                                        {lecturerCourseClasses.data.map((courseClass) => (
                                            <div key={courseClass.id} className="py-1">
                                                <CourseClassRow
                                                    courseClass={courseClass}
                                                    selected={selectedCourseClass?.payload?.id === courseClass.id}
                                                    onSelect={() => setSelectedCourseClass({payload: courseClass, action: "relation"})}
                                                    onDetach={() => handleDetachCourseClass(courseClass)}
                                                    hideButtons={["students", "delete"]}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Pagination ở dưới cùng */}
                                    <div className="mt-2 flex-shrink-0">
                                        <CommonPagination meta={lecturerCourseClasses.meta} onPageChange={fetchCourseClasses} />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-center text-gray-500">Không có dữ liệu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center">
                        <span className="text-sm font-bold text-center">
                            {parentLecturer
                                ? `Giảng viên ${parentLecturer.name} chưa được xếp lớp học phần nào`
                                : "Chọn một lớp học phần hoặc tìm kiếm"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}