import api from "@/utils/AxiosInstance";

export interface CustomOption {
    value: number | string;
    label: string;
}

export const getRegularClassOptions = async (search?: string) => {
    try {
        const res = await api.get<CustomOption[]>("/option/regular-class",  {
            params: {
                ...(search ? { search } : {})
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCourseOptions = async (search?: string) => {
    try {
        const res = await api.get<CustomOption[]>("/option/course",  {
            params: {
                ...(search ? { search } : {})
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCourseClassOptions = async (search?: string) => {
    try {
        const res = await api.get<CustomOption[]>("/option/course-class",  {
            params: {
                ...(search ? { search } : {})
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getLecturerOptions = async (search?: string) => {
    try {
        const res = await api.get<CustomOption[]>("/option/lecturer",  {
            params: {
                ...(search ? { search } : {})
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};