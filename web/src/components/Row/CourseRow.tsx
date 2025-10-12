import {Edit, PlusCircle, Trash2} from "lucide-react";
import {Course} from "@/types/Course";
import {deleteCourse} from "@/utils/service/crud/CourseService";
import {useAppDispatch} from "@/app/redux/hooks";
import {showMessage} from "@/app/redux/slices/messageSlice";

interface CourseRowProps {
    course: Course;
    onSelect: () => void;
    selected?: boolean;
    onEdit: () => void;
    onAdd: () => void;
    onDelete: (courseId: number) => void;
}

export default function CourseRow({course, onSelect, selected, onEdit, onAdd, onDelete}: CourseRowProps ) {
    const dispatch = useAppDispatch();


    const handleDelete = async (e) => {
        e.stopPropagation(); // Ngăn click lan lên cha
        if (window.confirm(`Bạn có chắc muốn xóa học phần  "${course.name}"?`)) {
            try {
                const data: any = await deleteCourse(course.id); // Gọi API
                if(data.success) {
                    onDelete(course.id);
                }
                dispatch(showMessage({message: data.message, success: data.success}))
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleEdit = (e) => {
        onEdit();
        e.stopPropagation();
    };

    const handleAdd = (e) => {
        onAdd();
        e.stopPropagation();
    };

    return (
        <div
            onClick={onSelect}
            className={`p-2 flex justify-between items-center bg-gray-100 rounded cursor-pointer ${selected ? `bg-primary2` :`hover:bg-primary2`}`}
        >
            <div className={`flex-1 min-w-0 p-1`}>
                <p className="font-bold text-sm truncate">{course.name}</p>
                <p className="text-sm text-gray-500">{course.course_code}</p>
            </div>
            <div className="flex gap-2 pr-1">
                <button
                    className="text-green-500 hover:text-green-700 group relative"
                    onClick={handleAdd}
                >
                    <PlusCircle size={18}/>
                    <span className={`tooltip`}>Thêm lớp học phần</span>
                </button>

                <button
                    className="text-blue-500 hover:text-blue-700 group relative"
                    onClick={handleEdit}
                >
                    <Edit size={18}/>
                    <span className={`tooltip`}>Chỉnh sửa</span>
                </button>
                <button className="text-red-500 hover:text-red-700 group relative"
                    onClick={handleDelete}
                >
                    <Trash2 size={18}/>
                    <span className={`tooltip z-50`}>Xoá</span>
                </button>
            </div>
        </div>
    );
}