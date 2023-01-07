import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    isLoggedIn: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
})

export const authReducer = authSlice.reducer;
export const setIsLoggedInAC = authSlice.actions.setIsLoggedInAC;

// types

export type InitialStateType = {
    isLoggedIn: boolean
}

export type AllAuthReducerActionType =
    | ReturnType<typeof setIsLoggedInAC>;




