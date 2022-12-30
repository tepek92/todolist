import {setIsLoggedInAC} from "../actions";

const initialState: InitialStateType = {
    isLoggedIn: false
};

export const authReducer = (state: InitialStateType = initialState, action: AllAuthReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state;
    }
};

// types

export type InitialStateType = {
    isLoggedIn: boolean
}

export type AllAuthReducerActionType =
    | ReturnType<typeof setIsLoggedInAC>;



