import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageState = {
    message: string;
    success: boolean | null; // true: success, false: error
    visible: boolean;
};

const messageInitialState: MessageState = {
    message: "",
    success: null,
    visible: false,
};

const messageSlice = createSlice({
    name: "message",
    initialState: messageInitialState,
    reducers: {
        showMessage: (
            state,
            action: PayloadAction<{ message: string; success: boolean }>
        ) => {
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.visible = true;
        },
        hideMessage: (state) => {
            state.visible = false;
        },
    },
});

export const { showMessage, hideMessage } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
export type { MessageState };