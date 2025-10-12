import { createSlice } from "@reduxjs/toolkit";

type SidebarState = {
    isSidebarOpen: boolean;
};

const sidebarInitialState: SidebarState = {
    isSidebarOpen: true, // Mặc định Sidebar mở (sửa comment nếu cần)
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: sidebarInitialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false;
        },
        openSidebar: (state) => {
            state.isSidebarOpen = true;
        },
    },
});

export const { toggleSidebar, closeSidebar, openSidebar } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
export type { SidebarState };