import { useState, useEffect } from 'react';
import {
    getCourseClassOptions,
    getCourseOptions,
    getLecturerOptions,
    getRegularClassOptions
} from "@/utils/service/OptionService";
import {CustomOption} from "@/utils/service/OptionService";

export function useFetchRegularClassOptions() {
    const [regularClassOptions, setRegularClassOptions] = useState<CustomOption[]>([]);

    useEffect(() => {
        const fetchRegularClasses = async () => {
            try {
                const data = await getRegularClassOptions();
                setRegularClassOptions(data);
            } catch (err: any) {
                console.error("Error fetching regular classes:", err);
            }
        };
        fetchRegularClasses();
    }, []);

    return { regularClassOptions };
}

export function useFetchCourseOptions() {
    const [courseOptions, setCourseOptions] = useState<CustomOption[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourseOptions();
                setCourseOptions(data);
            } catch (err: any) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);

    return { courseOptions };
}

export function useFetchCourseClassOptions() {
    const [courseClassOptions, setCourseClassOptions] = useState<CustomOption[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourseClassOptions();
                setCourseClassOptions(data);
            } catch (err: any) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);

    return { courseClassOptions };
}


export function useFetchLecturerOptions() {
    const [lecturerOptions, setLecturerOptions] = useState<CustomOption[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getLecturerOptions();
                setLecturerOptions(data);
            } catch (err: any) {
                console.error("Error fetching lecturers:", err);
            }
        };
        fetchCourses();
    }, []);

    return { lecturerOptions };
}