import React from "react";
import {ChevronFirst, ChevronLast, ChevronLeft, ChevronRight} from "lucide-react";

interface PaginationProps {
    meta: {
        current_page: number;
        last_page: number;
        from?: number;
        links?: object[];
        path?: string;
        per_page?: number;
        to?: string;
        total?: string;
    };
    onPageChange: (page: number) => void; // Truyền số trang vào API
}

export default function CommonPagination ({ meta, onPageChange } : PaginationProps)  {
    const { current_page, last_page } = meta;

    return (
        <div className="flex justify-center items-center gap-1 mt-4">
            {/* Nút "Trang đầu" */}
            <button
                onClick={() => onPageChange(1)}
                disabled={current_page === 1}
                className="text-sm p-2 border rounded disabled:opacity-50"
            >
                <ChevronFirst size={15} strokeWidth={2}/>
            </button>

            {/* Nút "Trước" */}
            <button
                onClick={() => onPageChange(current_page - 1)}
                disabled={current_page === 1}
                className="text-sm p-2 border rounded disabled:opacity-50"
            >
                <ChevronLeft size={15} strokeWidth={2}/>
            </button>

            {/* Hiển thị số trang (Chỉ hiển thị 5 trang gần kề) */}
            {Array.from({ length: Math.min(5, last_page) }, (_, index) => {
                let startPage = Math.max(1, current_page - 2);
                let endPage = Math.min(last_page, startPage + 4); // Đảm bảo không vượt quá last_page
                startPage = Math.max(1, endPage - 4); // Đảm bảo hiển thị đủ 5 trang nếu có thể

                let page = startPage + index;
                if (page > last_page) return null; // Tránh tạo ra trang không hợp lệ

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`text-sm px-3 py-1.5 border rounded ${
                            page === current_page ? "bg-primary text-white" : "hover:bg-primary2"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Nút "Tiếp" */}
            <button
                onClick={() => onPageChange(current_page + 1)}
                disabled={current_page === last_page}
                className="text-sm p-2 border rounded disabled:opacity-50"
            >
                <ChevronRight size={15} strokeWidth={2}/>
            </button>

            {/* Nút "Trang cuối" */}
            <button
                onClick={() => onPageChange(last_page)}
                disabled={current_page === last_page}
                className="text-sm p-2 border rounded disabled:opacity-50"
            >
                <ChevronLast size={15} strokeWidth={2}/>
            </button>
        </div>
    );
};
