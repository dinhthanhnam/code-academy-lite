import SideBarSection from "@/components/SideBar/SideBarSection";
import DropDownButton from "@/components/Button/DropDownButton";
import {TbSocial} from "react-icons/tb";
import {
    HiOutlineClipboardDocument,
    HiOutlineClipboardDocumentCheck,
    HiOutlineClipboardDocumentList
} from "react-icons/hi2";
import {SiHtmlacademy} from "react-icons/si";
import {LuProjector} from "react-icons/lu";
import {useLoadPersonalCourseClasses} from "@/hooks/useAuth";

export default function StudentSideBarContent() {
    const { courses: personalCourseClasses } = useLoadPersonalCourseClasses();
    const staticOptionsData1 = {
        social: [
            { id: "icedteaupontheacademy", name: "Trà đá học viện", path: "/iced-tea-upon-the-academy" },
        ],
        exercise: [
            { id: "irregular", name: "Bài tập tự do", path: "/irregular" },
        ],
        hall_of_fame: [
            { id: "xep-hang-khoa", name: "Bảng xếp hạng khoa", path: "/itde" }
        ]
    };

    const staticOptionsData2 = {
        social: [
            { id: "chatbox", name: "Chatbox", path: "/chatbox" },
        ],
    };
    return (
        <>
            <SideBarSection sectionName="Nền tảng">
                <DropDownButton
                    id="social"
                    title="Cộng đồng"
                    icon={TbSocial}
                    iconSize={22}
                    iconStrokeWidth={1.4}
                    referencePath="/social"
                    defaultOptions={staticOptionsData1.social}
                    options={staticOptionsData2.social}
                />
                <DropDownButton
                    id="courses"
                    title="Bài tập"
                    icon={HiOutlineClipboardDocument}
                    iconSize={22}
                    referencePath="/exercises"
                    iconStrokeWidth={1.5}
                    defaultOptions={staticOptionsData1.exercise}
                    options={personalCourseClasses} // Dùng dữ liệu động từ Redux
                />
                <DropDownButton
                    id="halloffame"
                    title="Bảng xếp hạng"
                    icon={SiHtmlacademy}
                    iconSize={20}
                    activePath="/hall-of-fame"
                    iconStrokeWidth={0.7}
                    chevron={false}
                />
            </SideBarSection>

            <SideBarSection sectionName="Cá nhân">
                <DropDownButton
                    id="pendingexercises"
                    title="Bài tập cần làm"
                    icon={HiOutlineClipboardDocumentList}
                    iconSize={22}
                    iconStrokeWidth={1.5}
                    activePath="/pending-exercises"
                    chevron={false}
                />
            </SideBarSection>
        </>

    );
}