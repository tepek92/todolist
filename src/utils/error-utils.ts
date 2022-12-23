import {setAppErrorAC, setAppStatusAC} from "../state/actions/app-actions";
import {ResponseType} from "../api/todolist-api";
import {AppDispatch} from "../state/store";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'));
}
export const handleServerNetworkError = (error: string, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error))
    dispatch(setAppStatusAC('failed'));
}
