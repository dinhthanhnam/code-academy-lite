export interface CourseClass {
    id?: number;
    course_id?: number | null;
    course_class_code: string;
    assigned_regular_class_id?: number | null;
    course_class_join_code?: string | null;
    lecturer_id?: number | null;
    name?: string;
    description?: string;
    active?: boolean;
    start_date?: string; // Frontend uses Date | null for DatePicker compatibility
    slug?: string;
    created_at?: Date | null; // Adjusted to allow null for consistency
    updated_at?: Date | null; // Adjusted to allow null for consistency
}