// hooks/useCourseClassExercises.ts
import { useEffect, useState } from "react";
import Exercise from "@/types/Exercise";
import {getCourseClass, getCourseClassExercises} from "@/utils/service/api/getCourseExercises";

export function useCourseClassExercises(slug: string) {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [courseClassId, setCourseClassId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            try {
                const res = await getCourseClassExercises(slug, 1, 100);
                console.log("API Response:", res);
                setExercises(res.data || []);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err);
                setExercises([]);
            } finally {
                setLoading(false);
            }
        };
        const fetchCourseClass = async () => {
            setLoading(true);
            try {
                const res = await getCourseClass(slug);
                console.log("API Response:", res);
                setCourseClassId(res.id);
            } catch (err) {
            console.error("Fetch error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                if (slug === "irregular") {
                    await fetchExercises();
                    setCourseClassId(null);
                } else {
                    await Promise.all([fetchExercises(), fetchCourseClass()]);
                }
            } finally {
                setLoading(false);
            }
        }; 

        if (slug) {
            fetchData();
        } else {
            setLoading(false);
            setError("Slug không hợp lệ");
        }
    }, [slug]);

    return { exercises, courseClassId, loading, error };
}
