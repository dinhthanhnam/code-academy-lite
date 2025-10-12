import api from "@/utils/AxiosInstance";

export interface LecturerClass {
    lecturer_id: number | null;
    course_class_id: number | null;
}

export const assignClass = async (payload: LecturerClass) => {
    try {
        const res = await api.post(`/lecturer/assign-course`, payload);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const detachClass = async (payload: LecturerClass) => {
    try {
        const res = await api.post(`/lecturer/detach-course`, payload);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
