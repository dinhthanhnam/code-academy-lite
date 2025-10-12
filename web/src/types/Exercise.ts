interface TestCase {
    stdin: string;
    expected_output: string;
}

export default interface Exercise {
    id?: number;
    title?: string;
    description?: string;
    level?: string;
    example_output?: string;
    example_input?: string;
    test_cases?: TestCase[];
    is_free?: boolean;
    time_limit?: number;
    memory_limit?: number;
    topics?: string[];
    language?: string;
    pivot?: {
        course_id?: number| null;
        week_number?: number;
        deadline?: string| null;
        is_hard_deadline?: number;
        is_active?: number;
    } | null;
}

export interface ExerciseListProps {
    exercises: Exercise[];
    onSelectExercise?: (exercise: Exercise | null) => void;
}

export interface PendingExerciseRowProps {
    exercise: Exercise;
    isSelected: boolean;
    onExerciseClick: (exercise: Exercise) => void;
    onStartExercise: (courseId?: number | null, weekNumber?: number) => void;
  }
