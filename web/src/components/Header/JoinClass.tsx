"use client";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { joinClassByCode } from "@/utils/service/StudentService";

const JoinClass: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Xử lý tham gia lớp
  const handleJoinClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (classCode.trim()) {
      try {
        const message = await joinClassByCode(classCode); // Gọi API để tham gia lớp
        setSuccess(message); // Hiển thị thông báo thành công
        setError(null); // Xóa lỗi nếu có
        setClassCode(""); // Reset mã lớp
        // Không đóng modal ở đây nữa
      } catch (err: any) {
        setError(err.message); // Hiển thị thông báo lỗi
        setSuccess(null); // Xóa thông báo thành công nếu có
      }
    }
  };

  return (
    <>
      {/* Icon dấu cộng */}
      <div
        className="p-1 rounded-full hover:bg-primary2 duration-200 group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <BiPlus size={28} />
        <span className="tooltip">Tham gia lớp</span>
      </div>

      {/* Modal nhập mã lớp */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 !m-0">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Tham gia lớp học</h3>
            <form onSubmit={handleJoinClass}>
              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="Nhập mã lớp"
                className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {/* Hiển thị thông báo lỗi nếu có */}
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              {/* Hiển thị thông báo thành công nếu có */}
              {success && (
                <p className="text-green-500 text-sm mb-4">{success}</p>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false); // Đóng modal khi nhấn Hủy
                    setError(null); // Xóa thông báo lỗi
                    setSuccess(null); // Xóa thông báo thành công
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-500"
                >
                  Tham gia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinClass;