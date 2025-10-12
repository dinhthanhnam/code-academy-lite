import { configureStore } from "@reduxjs/toolkit";
import { dropdownReducer } from "./slices/dropdownSlice";
import { navigationOptionReducer } from "./slices/navigationOptionSlice";
import { routerReducer } from "./slices/routerSlice";
import { sidebarReducer } from "./slices/sidebarSlice";
import { deviceReducer } from "./slices/deviceSlice";
import { roleReducer } from "./slices/roleSlice";
import { loadingReducer } from "./slices/loadingSlice";
import { messageReducer } from "./slices/messageSlice";
import { personalCourseClassesReducer } from "./slices/personalCourseClassesSlice";
import {lecturerCourseClassesReducer} from "@/app/redux/slices/lecturerCourseClassesSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        navigationOption: navigationOptionReducer,
        router: routerReducer,
        sidebar: sidebarReducer,
        device: deviceReducer,
        role: roleReducer,
        loading: loadingReducer,
        message: messageReducer,
        personalCourseClasses: personalCourseClassesReducer,
        lecturerCourseClasses: lecturerCourseClassesReducer,
    },
});

// Export TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;