import api from "@/utils/AxiosInstance";
import {setRole} from "@/app/redux/slices/roleSlice";
import {useAppDispatch} from "@/app/redux/hooks";

interface RoleResponse {
    role: string;
}

export const fetchRole = async () => {
    try {
        const res = await api.get<RoleResponse>('/api/personal_role'); // Thêm await
        return res.data.role;
    } catch (error) {
        console.error("Error fetching role:", error);
    }
}
