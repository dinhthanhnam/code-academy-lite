"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useDevice } from "@/hooks/useDevice";
import { User } from "@/types/User";
import { PaginatedUser } from "@/types/paginated/PaginatedUser";
import CommonButton from "@/components/Common/CommonButton";
import LecturerRow from "@/components/Row/LecturerRow";
import CommonSearch from "@/components/Common/CommonSearch";
import { getLecturers } from "@/utils/service/crud/LecturerService";
import CommonPagination from "@/components/Pagination/CommonPagination";
import { SyncLoader } from "react-spinners";
import LecturerCourseClassContainer from "@/components/Admin/Lecturer/LecturerCourseClassContainer";
import {LecturerModal} from "@/components/Modal/LecturerModal";
import {LecturerCourseClassModal} from "@/components/Modal/LecturerCourseClassModal";

interface LecturerModal {
    active: boolean | null;
    type: "create" | "update";
}

interface SelectedLecturerProps {
    payload: User;
    action: "modal" | "relation";
}

export default function AdminManagementLecturerPage() {
    const [lecturers, setLecturers] = useState<PaginatedUser | null>(null);
    const [lecturerModal, setLecturerModal] = useState<LecturerModal>({active: null, type: "create"});
    const [search, setSearch] = useState<string | null>(null);
    const [lecturerCourseClassModal, setLecturerCourseClassModal] = useState<boolean>(false);
    const [selectedLecturer, setSelectedLecturer] = useState<SelectedLecturerProps>({payload: null, action: null});
    const [loading, setLoading] = useState<boolean>(true);
    const { isMobile } = useDevice();

    // Hàm lấy danh sách khóa học (có hỗ trợ search + pagination)
    const fetchLecturers = async (page = 1, query?: string | null) => {
        setLoading(true);
        const data = await getLecturers(page, query);
        setLecturers(data);
        setLoading(false);
    };

    // Hàm tìm kiếm
    const handleSearch = () => {
        fetchLecturers(1, search);
    };

    useEffect(() => {
        if (search === "") {
            fetchLecturers(1, null);
        }
    }, [search]);

    useEffect(() => {
        fetchLecturers();
    }, []);

    const handleNewLecturer = (lecturer: User) => {
        if (lecturers && lecturers.data) {
            setLecturers({
                ...lecturers,
                data: [lecturer, ...lecturers.data]
            });
        } else {
            fetchLecturers();
        }
    };

    const handleLecturerUpdated = (updatedLecturer: User) => {
        if (lecturers && lecturers.data) {
            setLecturers({
                ...lecturers,
                data: lecturers.data.map((c) => (c.id === updatedLecturer.id ? updatedLecturer : c)),
            });
        }
    };

    const handleLecturerDeleted = (lecturerId: number) => {
        if (lecturers && lecturers.data) {
            setLecturers({
                ...lecturers,
                data: lecturers.data.filter((c) => c.id !== lecturerId),
            });
        }
    };

    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            {/* Lecturer List */}
            <div className={`bg-white p-2 rounded-lg shadow border border-secondary flex flex-col flex-grow ${isMobile ? "w-full" : "w-1/3"}`}>
                <div className="flex flex-row gap-2 p-2 justify-between items-center flex-shrink-0">
                    <CommonSearch
                        key="search_lecturer"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSearch}
                    />
                    <CommonButton onClick={() => {
                        setLecturerModal({ active: true, type: "create" });
                        setSelectedLecturer(null);
                    }}
                                  icon={Plus}
                                  label="Thêm giảng viên"
                    />
                </div>

                <div className="flex flex-col flex-grow overflow-hidden p-2">
                    <div className="border border-secondary p-2 rounded-md flex flex-col flex-grow overflow-hidden">
                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                            </div>
                        ) : lecturers?.data ? (
                            <div className="flex flex-col h-full">
                                {/* Phần chứa LecturerRow */}
                                <div className="overflow-y-auto flex-grow min-h-0">
                                    {lecturers.data.map((lecturer) => (
                                        <div key={lecturer.id} className="py-1">
                                            <LecturerRow
                                                lecturer={lecturer}
                                                selected={selectedLecturer?.payload?.id === lecturer.id}
                                                onSelect={() => setSelectedLecturer({ payload: lecturer, action: "relation" })}
                                                onDelete={handleLecturerDeleted}
                                                onEdit={() => {
                                                    setLecturerModal({active: true, type: "update"});
                                                    setSelectedLecturer({ payload: lecturer, action: "modal" });
                                                }}
                                                onAdd={() =>
                                                {
                                                    setLecturerCourseClassModal(true);
                                                    setSelectedLecturer({payload: lecturer, action: "modal" });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                <div className="mt-2 flex-shrink-0">
                                    <CommonPagination
                                        meta={lecturers.meta}
                                        onPageChange={(page) => fetchLecturers(page, search)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-center text-gray-500">Không có dữ liệu.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lecturer Class List */}
            <div className={`bg-white p-2 rounded-lg shadow flex border flex-grow border-secondary ${isMobile ? "w-full" : "w-2/3"}`}>
                <LecturerCourseClassContainer parentLecturer={selectedLecturer?.action === 'relation' ? selectedLecturer?.payload : null} deselectLecturer={() => setSelectedLecturer(null)}/>
            </div>

            {lecturerModal.active && (
                <LecturerModal
                    onClose={() => setLecturerModal({...lecturerModal, active: false})}
                    type={lecturerModal.type}
                    newLecturer={handleNewLecturer}
                    updatedLecturer={handleLecturerUpdated}
                    selectedLecturer={selectedLecturer?.payload}
                />
            )}

            {lecturerCourseClassModal && (
                <LecturerCourseClassModal
                    onClose={() => setLecturerCourseClassModal(false)}
                    selectedLecturer={selectedLecturer?.payload}
                />
            )}
        </div>
    );
}
