import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouterState {
    currentRoute: string;
}

const routerInitialState: RouterState = {
    currentRoute: "/", // Route mặc định
};

const routerSlice = createSlice({
    name: "router",
    initialState: routerInitialState,
    reducers: {
        setCurrentRoute: (state, action: PayloadAction<string>) => {
            state.currentRoute = action.payload;
        },
    },
});

export const { setCurrentRoute } = routerSlice.actions;
export const routerReducer = routerSlice.reducer;
export type { RouterState };