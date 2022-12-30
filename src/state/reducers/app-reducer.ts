import {setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "../actions";

const initialState: InitialStateType = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialized: false
};

export const appReducer = (state: InitialStateType = initialState, action: AllAppReducerActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state;
    }
};

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




