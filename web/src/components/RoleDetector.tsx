import { useEffect } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import { setRole } from "@/app/redux/slices/roleSlice";
import { fetchRole } from "@/utils/service/RoleService";

interface RoleDetectorProps {
    loaded: () => void;
}

export default function RoleDetector({ loaded }: RoleDetectorProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const setUserRole = async () => {
            try {
                const role = await fetchRole();
                dispatch(setRole(role));
            } catch (error) {
                console.error("Lỗi khi lấy role:", error);
            } finally {
                loaded(); // Gọi khi đã hoàn tất (dù có lỗi hay không)
            }
        };

        setUserRole();
    }, [dispatch, loaded]);

    return null;
}
