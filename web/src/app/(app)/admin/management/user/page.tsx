"use client";
import {useEffect, useState} from "react";
import { useDevice } from "@/hooks/useDevice";
import CommonSearch from "@/components/Common/CommonSearch";
import { SyncLoader } from "react-spinners";
import CommonPagination from "@/components/Pagination/CommonPagination";
import {PaginatedUser} from "@/types/paginated/PaginatedUser";
import {getUsers} from "@/utils/service/crud/UserService";
import UserRow from "@/components/Row/UserRow";
import {User} from "@/types/User";
import UserDetailContainer from "@/components/Admin/User/UserDetailContainer";
import UserModal from "@/components/Modal/UserModal";

interface UserModal {
    active: boolean | null;
    type: "create" | "update";
}

interface SelectedUserProps {
    payload: User | null;
    action: "modal" | "detail" | null;
}

export default function AdminManagementUserPage() {
    const [users, setUsers] = useState<PaginatedUser | null>(null);
    const [userModal, setUserModal] = useState<UserModal>({active: null, type: "update"});
    const [search, setSearch] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<SelectedUserProps>({payload: null, action: null});
    const [loading, setLoading] = useState<boolean>(true);
    const { isMobile } = useDevice();

    const fetchUsers = async (page = 1, query?: string | null) => {
        setLoading(true);
        const data = await getUsers(page, query);
        setUsers(data);
        setLoading(false);
    };

    const handleSearch = () => {
        fetchUsers(1, search);
    };

    useEffect(() => {
        if (search === "") {
            fetchUsers(1, null);
        }
    }, [search]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserUpdated = (updatedUser: User) => {
        if (users && users.data) {
            setUsers({
                ...users,
                data: users.data.map((c) => (c.id === updatedUser.id ? updatedUser : c)),
            });
        }
    };

    const handleUserDeleted = (userId: number) => {
        if (users && users.data) {
            setUsers({
                ...users,
                data: users.data.filter((c) => c.id !== userId),
            });
        }
    };

    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            {/* Course List */}
            <div className={`bg-white p-2 rounded-lg shadow border border-secondary flex flex-col flex-grow ${isMobile ? "w-full" : "w-1/2"}`}>
                <div className="flex flex-row gap-2 p-2 justify-between items-center flex-shrink-0">
                    <CommonSearch
                        key="search_user"
                        placeholder="Tìm kiếm người dùng..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSearch}
                    />
                </div>

                <div className="flex flex-col flex-grow overflow-hidden p-2">
                    <div className="border border-secondary p-2 rounded-md flex flex-col flex-grow overflow-hidden">
                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                            </div>
                        ) : users?.data ? (
                            <div className="flex flex-col h-full">
                                {/* Phần chứa CourseRow */}
                                <div className="overflow-y-auto flex-grow min-h-0">
                                    {users.data.map((user) => (
                                        <div key={user.id} className="py-1">
                                            <UserRow
                                                user={user}
                                                selected={selectedUser?.payload?.id === user.id}
                                                onSelect={() => setSelectedUser({payload: user, action: "detail"})}
                                                onDelete={() => handleUserDeleted(user.id)}
                                                onEdit={() => {
                                                    setUserModal({ active: true, type: "update"})
                                                    setSelectedUser({payload: user, action: "modal"});
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                <div className="mt-2 flex-shrink-0">
                                    <CommonPagination
                                        meta={users.meta}
                                        onPageChange={(page) => fetchUsers(page, search)}
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

            {/* Edit/Create Course Modal*/}
            {userModal.active && (
                <UserModal
                    onClose={() => setUserModal({...userModal, active: false})}
                    selectedUser={selectedUser.payload}
                    type={userModal.type}
                    updatedUser={handleUserUpdated}
                />
            )}
        </div>
    );
}
