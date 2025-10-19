import SideBarSection from "@/components/SideBar/SideBarSection";
import DropDownButton from "@/components/Button/DropDownButton";
import {TbSocial} from "react-icons/tb";

export default function AdminSideBarContent() {

    const staticOptionsData = {
        management: [
            { id: "courses&course-class", name: "Lớp học phần", path: "/course" },
            { id: "lecturer", name: "Giảng viên", path: "/lecturer" },
            { id: "user", name: "Người dùng", path: "/user" },
        ],
        database: [
            { id: "course", name: "Course", path: "/course" },
        ]
    };

    return (
        <>
            <div className={`mt-1`}></div>
            <SideBarSection sectionName="Quản lý">
                <DropDownButton
                    id="general-management"
                    title="Quản lý chung"
                    icon={TbSocial}
                    iconSize={22}
                    iconStrokeWidth={1.4}
                    referencePath="/admin/management"
                    defaultOptions={staticOptionsData.management}
                />
            </SideBarSection>

            {/*<SideBarSection sectionName="Cơ sở dữ liệu">*/}
            {/*    <DropDownButton*/}
            {/*        id="database"*/}
            {/*        title="Quản lý chung"*/}
            {/*        icon={TbSocial}*/}
            {/*        iconSize={22}*/}
            {/*        iconStrokeWidth={1.4}*/}
            {/*        referencePath="/admin/database"*/}
            {/*        defaultOptions={staticOptionsData.database}*/}
            {/*    />*/}
            {/*</SideBarSection>*/}
        </>

    );
}