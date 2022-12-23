import {setAppErrorAC, setAppStatusAC} from "../actions/app-actions";

const initialState: InitialStateType = {
    status: 'loading' as RequestStatusType,
    error: null
};

export const appReducer = (state: InitialStateType = initialState, action: AllAppReducerActionType): InitialStateType => {
    switch (action.type) {
        case " APP/SET-STATUS":
            return {...state, status: action.status}
        case " APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
};

// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export type AllAppReducerActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>;


