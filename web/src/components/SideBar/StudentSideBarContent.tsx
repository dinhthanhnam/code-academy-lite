import SideBarSection from "@/components/SideBar/SideBarSection";
import DropDownButton from "@/components/Button/DropDownButton";
import {TbHome, TbSocial} from "react-icons/tb";
import {
    HiOutlineClipboardDocument,
    HiOutlineClipboardDocumentList
} from "react-icons/hi2";
import {SiHtmlacademy} from "react-icons/si";
import {useLoadPersonalCourseClasses} from "@/hooks/useAuth";

export default function StudentSideBarContent() {
    const { courses: personalCourseClasses } = useLoadPersonalCourseClasses();
    const staticOptionsData1 = {
        exercise: [],
        hall_of_fame: [
            { id: "xep-hang-khoa", name: "Bảng xếp hạng khoa", path: "/itde" }
        ]
    };

    return (
        <>
            <div className = "pt-2 pb-2">
                <DropDownButton
                    id="home"
                    title="Trang chủ"
                    icon={TbHome}
                    iconSize={22}
                    iconStrokeWidth={2}
                    activePath="/"
                    chevron={false}
                />
            </div>
            <SideBarSection sectionName="Nền tảng">
                <DropDownButton
                    id="chatbox"
                    title="Tin nhắn"
                    icon={TbSocial}
                    iconSize={22}
                    iconStrokeWidth={1.4}
                    activePath="/social/chatbox"
                    chevron={false}
                />
                <DropDownButton
                    id="courses"
                    title="Bài tập"
                    icon={HiOutlineClipboardDocument}
                    iconSize={22}
                    referencePath="/exercises"
                    iconStrokeWidth={1.5}
                    defaultOptions={staticOptionsData1.exercise}
                    options={personalCourseClasses}
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

            {/*<SideBarSection sectionName="Cá nhân">*/}
            {/*    <DropDownButton*/}
            {/*        id="pendingexercises"*/}
            {/*        title="Bài tập cần làm"*/}
            {/*        icon={HiOutlineClipboardDocumentList}*/}
            {/*        iconSize={22}*/}
            {/*        iconStrokeWidth={1.5}*/}
            {/*        activePath="/pending-exercises"*/}
            {/*        chevron={false}*/}
            {/*    />*/}
            {/*</SideBarSection>*/}
        </>

    );
}