import SideBarSection from "@/components/SideBar/SideBarSection";
import DropDownButton from "@/components/Button/DropDownButton";
import {TbSocial} from "react-icons/tb";
import {SiGoogleclassroom} from "react-icons/si";
import {useLoadLecturerCourseClasses} from "@/hooks/useAuth";

export default function LecturerSideBarContent() {

    const { courses: lecturerCourseClasses } = useLoadLecturerCourseClasses();

    return (
        <>
            <SideBarSection sectionName="Giảng viên">
                <DropDownButton
                    id="course-class"
                    title="Quản lý lớp"
                    icon={SiGoogleclassroom}
                    iconSize={20}
                    iconStrokeWidth={0.2}
                    activePath="/lecturer/class"
                    options={lecturerCourseClasses}
                />
            </SideBarSection>
        </>
    );
}