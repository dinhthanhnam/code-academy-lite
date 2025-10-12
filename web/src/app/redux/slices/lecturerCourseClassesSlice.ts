import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface lecturerCourseClass {
    id: string;
    name: string;
    path: string;
}

interface lecturerCourseClassesState {
    courses: lecturerCourseClass[];
}

const lecturerCourseClassesInitialState: lecturerCourseClassesState = {
    courses: [],
};

const lecturerCourseClassesSlice = createSlice({
    name: "lecturerCourseClasses",
    initialState: lecturerCourseClassesInitialState,
    reducers: {
        lecturerCourseClasses(state, action: PayloadAction<lecturerCourseClass[]>) {
            state.courses = action.payload;
        },
    },
});

export const { lecturerCourseClasses } = lecturerCourseClassesSlice.actions;
export const lecturerCourseClassesReducer = lecturerCourseClassesSlice.reducer;
export type { lecturerCourseClassesState, lecturerCourseClass };