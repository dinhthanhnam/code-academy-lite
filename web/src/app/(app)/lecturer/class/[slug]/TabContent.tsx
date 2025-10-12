"use client";

import { useClassContext } from "./ClassContext";
import ExerciseDetail from "./ExerciseDetail";
import StudentList from "./StudentList";
import SubmissionList from "./SubmissionList";

export default function TabContent() {
    const { activeTab, selectedExercise, students } = useClassContext();

    const renderContent = () => {
        switch (activeTab) {
            case "detail":
                return <ExerciseDetail exercise={selectedExercise} />;
            case "submissions":
                return <SubmissionList />;
            case "students":
                return <StudentList students={students} />;
            default:
                return null;
        }
    };

    return <div className="flex-1 p-4 overflow-auto">{renderContent()}</div>;
}
