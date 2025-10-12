import {User} from "@/types/User";
import {Edit, Trash2} from "lucide-react";
import {deleteUser} from "@/utils/service/crud/UserService";
import {showMessage} from "@/app/redux/slices/messageSlice";
import {useAppDispatch} from "@/app/redux/hooks";

interface UserRowProps {
    user: User;
    onSelect: () => void;
    selected?: boolean;
    onEdit: () => void;
    onDelete: (userId: number) => void;
}

export default function UserRow({user, onSelect, selected, onEdit, onDelete}: UserRowProps ) {
    const dispatch = useAppDispatch();
    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm(`Bạn có chắc muốn xóa người dùng "${user.name}"?`)) {
            try {
                const data: any = await deleteUser(user.id);
                if(data.success) {
                    onDelete(user.id);
                }
                dispatch(showMessage({message: data.message, success: data.success}))
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
    };
    const handleEdit = (e) => {
        onEdit();
        e.stopPropagation();
    };
    
    return (
        <div
            onClick={onSelect}
            className={`p-2 flex justify-between items-center bg-gray-100 rounded cursor-pointer ${selected ? `bg-primary2` :`hover:bg-primary2`}`}
        >
            <div className={`flex-1 min-w-0 p-1`}>
                <p className="font-bold text-sm truncate">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleEdit}
                >
                    <Edit size={18}/>
                </button>
                <button className="text-red-500 hover:text-red-700"
                        onClick={handleDelete}
                >
                    <Trash2 size={18}/>
                </button>
            </div>
        </div>
    );
}