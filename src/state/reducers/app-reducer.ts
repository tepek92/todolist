import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialized: false
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC: (state,action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status;
        },
        setAppErrorAC: (state,action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error;
        },
        setIsInitializedAC: (state,action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    }
    }
);

export const appReducer = appSlice.reducer;
export const setAppStatusAC = appSlice.actions.setAppStatusAC;
export const setAppErrorAC = appSlice.actions.setAppErrorAC;
export const setIsInitializedAC = appSlice.actions.setIsInitializedAC;

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type AllAppReducerActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>;




