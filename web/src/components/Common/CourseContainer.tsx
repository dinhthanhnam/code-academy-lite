import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CourseClass } from "@/types/CourseClass";
import Link from "next/link";

interface CourseContainerProps {
    courseClass: CourseClass;
    referencePath: string;
}

export default function CourseContainer({ courseClass, referencePath }: CourseContainerProps) {
    return (
        <Link
            key={courseClass.id}
            className="w-full h-full border border-primary shadow-md rounded-md flex flex-col justify-between p-4 cursor-pointer hover:shadow-lg"
            href={referencePath + `/${courseClass.slug}`}
        >
            <h3 className="text-lg font-bold text-primary">{courseClass.name}</h3>
            <p className="text-sm text-gray-500">Mã học phần: {courseClass.course_class_code}</p>
            <img
                src="https://placehold.co/600x200"
                alt="Course Placeholder"
                className="w-full max-h-40 object-cover rounded-md my-2"
            />
            <p className="text-sm text-gray-500">Mô tả: {courseClass.description}</p>
            <p className="text-xs text-gray-400">Trạng thái:
                <span className={`${courseClass.active ? "text-green-500" : "text-red-500"}`}>
                    {courseClass.active ? " Đang hoạt động" : " Đã kết thúc"}
                </span>
            </p>
            <p className="text-xs text-gray-400">Ngày bắt đầu: {courseClass.start_date ? format(new Date(courseClass.start_date), "dd/MM/yyyy", { locale: vi }) : "Chưa có ngày"}</p>
        </Link>
    );
}
