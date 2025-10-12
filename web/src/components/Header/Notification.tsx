"use client";
import React, { useState } from "react";
import { LuMessageCircleMore } from "react-icons/lu";

const Notifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<
    { text: string; isViewed: boolean }[]
  >([
    { text: "Bài kiểm tra số 1 - Lớp nhập môn ngành công nghệ thông tin", isViewed: false },
    { text: "Cập nhật hệ thống đã hoàn tất.", isViewed: false },
  ]);
  const [input, setInput] = useState("");

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setNotifications([{ text: input, isViewed: false }, ...notifications]); // Thêm thông báo mới chưa xem
      setInput("");
      setIsOpen(true); // Mở danh sách thông báo khi gửi
    }
  };

  const handleViewNotification = (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].isViewed = true; // Đánh dấu thông báo là đã xem
    setNotifications(updatedNotifications);
  };

  // Đếm số thông báo chưa xem
  const unreadCount = notifications.filter((notif) => !notif.isViewed).length;

  return (
    <>
      {/* Icon thông báo */}
      <div
        className="p-1 rounded-full hover:bg-primary2 duration-200 group relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LuMessageCircleMore size={28} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
        <span className="tooltip">Thông báo</span>
      </div>

      {/* Danh sách thông báo */}
      {isOpen && (
        <div className="fixed top-16 right-4 bg-white w-80 max-h-[400px] rounded-lg shadow-xl z-40 flex flex-col">
          {/* Header */}
          <div className="bg-orange-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Thông báo</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Danh sách thông báo */}
          <div className="flex-1 overflow-y-auto p-2">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Chưa có thông báo nào</p>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={index}
                  className={`p-3 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 text-gray-800 rounded-md mb-1 cursor-pointer transition-all duration-200 flex items-center justify-between`}
                  onClick={() => handleViewNotification(index)} 
                >
                  <div className="w-5/6">
                    <p className="text-sm">{notif.text}</p>
                    <span className="text-xs text-gray-500">Vừa xong</span>
                  </div>
                  {!notif.isViewed && (
                    <span className="w-2 h-2 bg-orange-600 rounded-full z-10"></span> // Dấu chấm cho thông báo chưa xem
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </>
  );
};

export default Notifications;