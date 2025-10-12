import {CourseClass} from "@/types/CourseClass";
import {useAppDispatch} from "@/app/redux/hooks";
import {deleteCourseClass} from "@/utils/service/crud/CourseClassService";
import {showMessage} from "@/app/redux/slices/messageSlice";
import {format} from "date-fns";
import {PiStudentFill} from "react-icons/pi";
import {Edit, Trash2} from "lucide-react";
import {vi} from "date-fns/locale";
import {detachClass} from "@/utils/service/crud/LecturerCourseClassService";
import {GrDetach} from "react-icons/gr";

interface CourseClassProps {
    courseClass: CourseClass;
    onSelect: () => void;
    selected?: boolean;
    onEdit?: () => void;
    onDetach?: () => void;
    onDelete?: (courseId: number) => void;
    openStudentList?: () => void;
    hideButtons?: string[]; // Danh sách các button cần ẩn
}

export default function CourseClassRow({
                                           courseClass,
                                           onSelect,
                                           selected,
                                           onDelete,
                                           onDetach,
                                           onEdit,
                                           openStudentList,
                                           hideButtons = []
                                       }: CourseClassProps) {
    const dispatch = useAppDispatch();

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm(`Bạn có chắc muốn xóa lớp học phần "${courseClass.name}"?`)) {
            try {
                const data: any = await deleteCourseClass(courseClass.id);
                if (data.success) {
                    onDelete && onDelete(courseClass.id);
                }
                dispatch(showMessage({message: data.message, success: data.success}));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDetach = async (e) => {
        e.stopPropagation();
        onDetach && onDetach();
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit && onEdit();
    };

    const handleOpenStudentList = (e) => {
        e.stopPropagation();
        openStudentList && openStudentList();
    };

    return (
        <div
            onClick={onSelect}
            className={`p-2 flex justify-between items-center bg-gray-100 rounded cursor-pointer ${selected ? `bg-primary2` : `hover:bg-primary2`}`}
        >
            <div className="flex-1 min-w-0 p-1">
                <p className="font-bold text-sm truncate">{courseClass.name}</p>
                <p className="text-sm text-gray-600 truncate">{courseClass.description}</p>
                <p className="text-sm text-gray-500 truncate">{courseClass.course_class_code}</p>
            </div>
            <div className="flex items-center flex-1 min-w-0 p-1 justify-between">
                <div>
                    <p className="text-sm text-gray-600 truncate">
                        {courseClass.start_date ? format(new Date(courseClass.start_date), "dd/MM/yyyy", {locale: vi}) : "Chưa có ngày"}
                    </p>
                    <p className={`text-ssm truncate ${courseClass.active ? "text-green-600" : "text-red-600"}`}>
                        {courseClass.active ? "Đang diễn ra" : "Kết thúc"}
                    </p>
                </div>
                <div className="flex gap-2">
                    {!hideButtons.includes("students") && (
                        <button className="text-primary hover:text-amber-700 group relative"
                                onClick={handleOpenStudentList}>
                            <PiStudentFill size={20}/>
                            <span className="tooltip">Sinh viên</span>
                        </button>
                    )}
                    {!hideButtons.includes("edit") && (
                        <button className="text-blue-500 hover:text-blue-700 group relative" onClick={handleEdit}>
                            <Edit size={18}/>
                            <span className="tooltip">Chỉnh sửa</span>
                        </button>
                    )}
                    {!hideButtons.includes("delete") && (
                        <button className="text-red-500 hover:text-red-700 group relative" onClick={handleDelete}>
                            <Trash2 size={18}/>
                            <span className="tooltip">Xoá</span>
                        </button>
                    )}
                    {!hideButtons.includes("detach") && (
                        <button className="text-red-500 hover:text-red-700 group relative" onClick={handleDetach}>
                            <GrDetach size={18}/>
                            <span className="tooltip">Gỡ</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
