import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropDownState {
    activeDropdown: string | null; // Sửa từ String thành string
}

const dropdownInitialState: DropDownState = {
    activeDropdown: null,
};

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState: dropdownInitialState,
    reducers: {
        setActiveDropdown: (state, action: PayloadAction<string | null>) => {
            state.activeDropdown =
                state.activeDropdown === action.payload ? null : action.payload;
        },
    },
});

export const { setActiveDropdown } = dropdownSlice.actions;
export const dropdownReducer = dropdownSlice.reducer;
export type { DropDownState };