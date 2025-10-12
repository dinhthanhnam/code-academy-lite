import {useClassContext} from "@/app/(app)/lecturer/class/[slug]/ClassContext";
import Exercise from "@/types/Exercise";

export default function ExerciseRow({exercise} : {exercise: Exercise}) {
    const {selectedExercise, setSelectedExercise} = useClassContext();
    return(
        <div
            key={exercise.id}
            className={`flex flex-row p-4 border-b cursor-pointer transition-colors duration-200 ${
                selectedExercise === exercise
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-50 text-gray-800"
            }`}
            onClick={() => setSelectedExercise(exercise)}
        >
            <div className="w-4/12">{exercise.title}</div>
            <div className="w-2/12 text-center">{exercise.level}</div>
            <div className="w-3/12 text-center">{exercise.topics.join(", ")}</div>
            <div className="w-2/12 text-center">{exercise.pivot.deadline}</div>
        </div>
    );
}