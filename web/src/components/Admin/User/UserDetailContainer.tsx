import {useState} from "react";
import {User} from "@/types/User";

interface UserDetailContainerProps {
    user?: User;
}

interface SelectedUserProps {
    payload: User | null;
    action: "modal" | "detail" | null;
}

export default function UserDetailContainer({user = null}: UserDetailContainerProps) {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col w-full h-full">
            {/* Phần header - Search và Button */}
            <div className="flex gap-2 p-2 justify-between items-center flex-shrink-0">
                <h2>Chi tiết người dùng {user?.name}</h2>
            </div>

            {/* Phần nội dung chính */}
            <div className="flex-grow flex flex-col overflow-hidden">

            </div>
        </div>
    );
}