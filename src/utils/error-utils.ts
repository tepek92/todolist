import {ResponseType} from "../api/todolist-api";
import {AppDispatch} from "../state/store";
import {setAppErrorAC, setAppStatusAC} from "../state/reducers/app-reducer";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}));
}
export const handleServerNetworkError = (error: string, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC({error: error}))
    dispatch(setAppStatusAC({status: 'failed'}));
}
