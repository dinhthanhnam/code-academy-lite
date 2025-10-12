"use client";

import { useState } from "react";
import {User} from "@/types/User";
import {PaginatedUser} from "@/types/paginated/PaginatedUser";
import CommonPagination from "@/components/Pagination/CommonPagination";

interface StudentListProps {
    students: PaginatedUser | null;
}

export default function StudentList({ students }: StudentListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    if (!students || !students?.data?.length) {
        return <p className="text-gray-600">Không có sinh viên nào trong lớp</p>;
    }

    const handlePageChange = async (url: string | null) => {
        if (!url) return;
        try {
            const response = await fetch(url);
            const newData = await response.json();
            // Giả định bạn có cách cập nhật students trong context, tạm thời log để kiểm tra
            console.log("New page data:", newData);
            setCurrentPage(newData.meta.current_page);
            // Cần cập nhật students trong ClassContext ở đây
        } catch (error) {
            console.error("Failed to fetch page:", error);
        }
    };

    return (
        <div className="h-full max-h-[calc(100vh-200px)] overflow-auto space-y-6 pr-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Danh sách sinh viên</h2>

            {/* Bảng danh sách sinh viên */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 font-semibold">
                    <tr>
                        <th className="p-3 w-1/12">ID</th>
                        <th className="p-3 w-3/12">Tên</th>
                        <th className="p-3 w-4/12">Email</th>
                        <th className="p-3 w-3/12">Mã sinh viên</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.data.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{student.id}</td>
                            <td className="p-3">{student.name}</td>
                            <td className="p-3">{student.email}</td>
                            <td className="p-3">{student.identity_code || "N/A"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <CommonPagination meta={students.meta} onPageChange={(page: number) => { }}
            />
        </div>
    );
}