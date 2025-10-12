import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
    isMobile: boolean;
}

const deviceInitialState: DeviceState = {
    isMobile: false, // Mặc định là máy tính
};

const deviceSlice = createSlice({
    name: "device",
    initialState: deviceInitialState,
    reducers: {
        setDeviceType: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },
    },
});

export const { setDeviceType } = deviceSlice.actions;
export const deviceReducer = deviceSlice.reducer;
export type { DeviceState };