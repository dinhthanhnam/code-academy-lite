"use client";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import { useDevice } from "@/hooks/useDevice";
import { useRole } from "@/hooks/useAuth";
import {useEffect, useState} from "react";
import {getPendingExercises} from "@/utils/service/api/getCourseExercises";

// Dữ liệu mẫu với id

export default function Home() {
  const { isMobile } = useDevice();
  const { isStudent } = useRole();
  const [ pendingExercises, setPendingExercises ] = useState();

  useEffect(() => {
    if (!isStudent) return;
    const fetchPendingExercises = async () => {
      const res = await getPendingExercises();
      // @ts-ignore
      setPendingExercises(res.data);
    };
    fetchPendingExercises();
  }, [isStudent]);

  if (!isStudent) {
    return null;
  }

  return (
    <div className="max-w-screen mx-auto">
      <div className={`flex`}>
        <div className={`flex`}>
          <PendingExerciseList
            exercises={pendingExercises}
            onSelectExercise={(exercise) => console.log(exercise)}
          />
        </div>
      </div>
    </div>
  );
}