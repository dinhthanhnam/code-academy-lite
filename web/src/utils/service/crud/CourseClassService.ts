import {PaginatedCourseClass} from "@/types/paginated/PaginatedCourseClass";
import api from "@/utils/AxiosInstance";
import {Course} from "@/types/Course";
import {CourseClass} from "@/types/CourseClass";

export const getCourse = async (id: number) => {
    try {
        const res = await api.get(`/admin/course-class/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCourseClassesForLecturer = async (page: number, search?: string) => {
    try {
        const res = await api.get<PaginatedCourseClass>("/api/lecturer/course-classes", {
            params: {
                page,
                ...(search ? { search } : {}),
            },
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCourseClasses = async (page: number, search?: string) => {
    try {
        const res = await api.get<PaginatedCourseClass>("/admin/course-class", {
            params: {
                page,
                ...(search ? { search } : {}),
            },
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const createCourseClass = async (payload: CourseClass) => {
    try {
        const res = await api.post("admin/course-class", payload)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

export const updateCourseClass = async (id: number , payload: CourseClass) => {
    try {
        const res = await api.put(`admin/course-class/${id}`, payload)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

export const deleteCourseClass = async (id: number ) => {
    try {
        const res = await api.delete(`admin/course-class/${id}`)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}


