"use client";
import ProfileHolder from "@/components/Header/ProfileHolder";
import { BiDockLeft } from "react-icons/bi";
import { toggleSidebar } from "@/app/redux/slices/sidebarSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import Notifications from "./Notification";
import JoinClass from "./JoinClass";

export default function Header() {
  const dispatch = useAppDispatch();

  return (
    <div className="px-2 w-full self-center flex flex-row items-center min-w-screen justify-between min-h-14 bg-gray-100 border-main border-b shadow-secondary2 shadow-sm">
      {/* Sidebar Toggle */}
      <div className="flex flex-row cursor-pointer">
        <div className="p-0.5 rounded-sm hover:bg-primary2 duration-200 group relative">
          <BiDockLeft size={30} onClick={() => dispatch(toggleSidebar())} />
          <span className="tooltip">Ẩn/hiện Sidebar</span>
        </div>
      </div>

      {/* ProfileHolder, JoinClass, và Chatbox */}
      <div className="flex items-center space-x-4">
        <JoinClass />
        <ProfileHolder />
      </div>
    </div>
  );
}