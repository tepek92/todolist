import {AppDispatch, AppThunk} from "../store";
import {setAppStatusAC, setIsInitializedAC, setIsLoggedInAC} from "../actions";
import axios, {AxiosError} from "axios";
import {authAPI} from "../../api/auth-api";
import {RESULT_CODE} from "./todolist-thunk";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";



export const initializeAppTC = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            const textError = error.response?.data ? error.response.data.message : error.message
            handleServerNetworkError(textError, dispatch);
        }
    } finally {
        dispatch(setIsInitializedAC(true));
    }
}