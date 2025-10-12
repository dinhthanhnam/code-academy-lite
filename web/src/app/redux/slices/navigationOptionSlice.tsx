import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationOptionState {
    activeNavigationOption: string | null;
}

const navigationOptionInitialState: NavigationOptionState = {
    activeNavigationOption: null,
};

const navigationOptionSlice = createSlice({
    name: "navigationOption",
    initialState: navigationOptionInitialState,
    reducers: {
        setActiveNavigationOption: (state, action: PayloadAction<string | null>) => {
            state.activeNavigationOption =
                state.activeNavigationOption === action.payload ? null : action.payload;
        },
    },
});

export const { setActiveNavigationOption } = navigationOptionSlice.actions;
export const navigationOptionReducer = navigationOptionSlice.reducer;
export type { NavigationOptionState };