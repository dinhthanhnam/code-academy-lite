import { TbHelp, TbHome } from "react-icons/tb";
import SideBarHeader from "@/components/SideBar/SideBarHeader";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { setActiveDropdown } from "@/app/redux/slices/dropdownSlice";
import { setActiveNavigationOption } from "@/app/redux/slices/navigationOptionSlice";
import {useEffect, useRef } from "react";
import { closeSidebar } from "@/app/redux/slices/sidebarSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { useRole, useSidebarState} from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import {useDevice} from "@/hooks/useDevice";
import NormalButton from "../Button/NormalButton";
import {TbSocial} from "react-icons/tb";
import DropDownButton from "@/components/Button/DropDownButton";

const StudentSideBarContent = dynamic(() => import("@/components/SideBar/StudentSideBarContent"));
const AdminSideBarContent = dynamic(() => import("@/components/SideBar/AdminSideBarContent"));
const LecturerSideBarContent = dynamic(() => import("@/components/SideBar/LecturerSideBarContent"));

export default function SideBar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { activeNavigationOption, isSidebarOpen } = useSidebarState();
    const { isMobile } = useDevice();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const {isStudent, isAdmin, isLecturer} = useRole();


    useEffect(() => {
        if (isMobile && isSidebarOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                    dispatch(closeSidebar());
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isMobile, isSidebarOpen, dispatch]);

    const SidebarContent = isStudent ? <StudentSideBarContent /> : isAdmin ? <AdminSideBarContent /> : isLecturer ? <LecturerSideBarContent /> : null;

    return (
        <div
            ref={sidebarRef}
            className={`
                ${isMobile
                    ? isSidebarOpen
                        ? "fixed w-60 inset-0 bg-white z-50"
                        : "hidden"
                    : isSidebarOpen
                        ? "relative md:min-w-60"
                        : "absolute w-0 overflow-hidden"}
              `}
                >
            <div className="rounded-md flex flex-col border-foreground border-r-2 min-h-screen shadow-secondary shadow-lg">
                <SideBarHeader />

                <div className="flex flex-col flex-grow gap-2">
                    {SidebarContent}
                </div>
            </div>
        </div>
    );
}