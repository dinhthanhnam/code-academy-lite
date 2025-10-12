"use client";
import { useState } from "react";
import { use } from "react";
import ExerciseList from "@/components/Exercise/ExerciseList";
import CustomAceEditor from "@/components/CodeEditor/CustomAceEditor";
import { useCourseClassExercises } from "@/hooks/useFetchExercisesByClass";
import Exercise from "@/types/Exercise";

export default function ExercisesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { courseClassId, exercises, loading, error } = useCourseClassExercises(slug);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <>
            <ExerciseList
                exercises={exercises}
                onSelectExercise={setSelectedExercise}
            />
            <CustomAceEditor
                courseClassId={courseClassId ? courseClassId : null}
                selectedExercise={selectedExercise}
            />
        </>
            
    );
}