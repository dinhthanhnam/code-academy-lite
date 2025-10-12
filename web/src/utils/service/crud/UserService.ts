import api from "@/utils/AxiosInstance";
import {PaginatedUser} from "@/types/paginated/PaginatedUser";
import {User} from "@/types/User";

export const getUser = async (id: number) => {
    try {
        const res = await api.get<User>(`/admin/user/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUsers = async (page: number, search?: string) => {
    try {
        const res = await api.get<PaginatedUser>("/admin/user", {
            params: {
                page,
                ...(search ? { search } : {}), // Chỉ thêm search nếu có giá trị
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const createUser = async (payload: User) => {
    try {
        const res = await api.post("admin/user", payload)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

export const updateUser = async (id: number , payload: User) => {
    try {
        const res = await api.put(`admin/user/${id}`, payload)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (id: number ) => {
    try {
        const res = await api.delete(`admin/user/${id}`)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

// export const getCourseClassesByUser = async  (page: number, lecturer_id?: number, search?: string) => {
//     try {
//         const res = await api.get<PaginatedCourseClass>("/lecturer/course-classes", {
//             params: {
//                 page,
//                 ...(lecturer_id ? { lecturer_id } : {}),
//                 ...(search ? { search } : {}),
//             },
//         })
//         return res.data;
//     } catch (error) {
//         console.error(error);
//     }
// }

