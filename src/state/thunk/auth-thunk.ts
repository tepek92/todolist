import {AppDispatch, AppThunk} from "../store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {authAPI, RequestPayloadType} from "../../api/auth-api";
import {RESULT_CODE} from "./todolist-thunk";
import {setIsLoggedInAC} from "../reducers/auth-reducer";
import {setAppStatusAC} from "../reducers/app-reducer";
import {clearTodolistsDataAC} from "../reducers/todolists-reducer";

export const loginTC = (formData: RequestPayloadType): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.login(formData);
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            const textError = error.response?.data ? error.response.data.message : error.message
            handleServerNetworkError(textError, dispatch);
        }
    }
}


export const logoutTC = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(clearTodolistsDataAC());
            dispatch(setIsLoggedInAC({isLoggedIn: false}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            const textError = error.response?.data ? error.response.data.message : error.message
            handleServerNetworkError(textError, dispatch);
        }
    }
}
