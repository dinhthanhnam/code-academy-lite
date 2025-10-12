"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useParams } from "next/navigation";
import { getCourseClass, getCourseClassExercises, getCourseClassStudents } from "@/utils/service/api/getCourseExercises";
import { PaginatedExercise } from "@/types/paginated/PaginatedExercise";
import Exercise from "@/types/Exercise";
import { PaginatedUser } from "@/types/paginated/PaginatedUser";
import { CourseClass } from "@/types/CourseClass";

// Define types
interface ClassContextType {
    exercises: PaginatedExercise;
    courseClass: CourseClass | null;
    students: PaginatedUser;
    loading: boolean;
    error: string | null;
    selectedExercise: Exercise | null;
    activeTab: string;
    setSelectedExercise: (exercise: Exercise | null) => void;
    setActiveTab: (tab: string) => void;
    fetchExercises: (page: number) => Promise<void>;
}

interface ClassProviderProps {
    children: ReactNode;
}

// Create Context
const ClassContext = createContext<ClassContextType | undefined>(undefined);

// Context Provider
export default function ClassProvider({ children }: ClassProviderProps) {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const [exercises, setExercises] = useState<PaginatedExercise>();
    const [courseClass, setCourseClass] = useState<CourseClass | null>(null);
    const [students, setStudents] = useState<PaginatedUser>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [activeTab, setActiveTab] = useState<string>("details");

    // Fetch exercises for a specific page
    const fetchExercises = async (page: number) => {
        if (!slug) return;
        try {
            const exercisesRes = await getCourseClassExercises(slug, page);
            setExercises(exercisesRes);
        } catch (err) {
            setError("Failed to fetch exercises");
            console.error("Error fetching exercises:", err);
        }
    };

    // Initial fetch for exercises
    useEffect(() => {
        const fetchExercisesData = async () => {
            if (!slug) {
                setError("No class slug provided");
                setLoading(false);
                return;
            }

            try {
                const exercisesRes = await getCourseClassExercises(slug, 1); // Initial page
                setExercises(exercisesRes);
            } catch (err) {
                setError("Failed to fetch exercises");
                console.error("Error fetching exercises:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchExercisesData();
    }, [slug]);

    // Fetch courseClass and students only once
    useEffect(() => {
        const fetchOtherData = async () => {
            if (!slug) {
                setError("No class slug provided");
                return;
            }

            try {
                const [courseClassRes, studentsRes] = await Promise.all([
                    getCourseClass(slug),
                    getCourseClassStudents(slug),
                ]);

                setCourseClass(courseClassRes);
                setStudents(studentsRes);
            } catch (err) {
                setError("Failed to fetch course class or students");
                console.error("Error fetching data:", err);
            }
        };

        fetchOtherData();
    }, [slug]);

    const value = {
        exercises,
        courseClass,
        students,
        loading,
        error,
        selectedExercise,
        activeTab,
        setSelectedExercise,
        setActiveTab,
        fetchExercises,
    };

    return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
}

// Custom hook to use context
export function useClassContext() {
    const context = useContext(ClassContext);
    if (context === undefined) {
        throw new Error("useClassContext must be used within a ClassProvider");
    }
    return context;
}