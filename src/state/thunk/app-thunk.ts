import {AppDispatch, AppThunk} from "../store";
import axios, {AxiosError} from "axios";
import {authAPI} from "../../api/auth-api";
import {RESULT_CODE} from "./todolist-thunk";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setIsLoggedInAC} from "../reducers/auth-reducer";
import {setAppStatusAC, setIsInitializedAC} from "../reducers/app-reducer";



export const initializeAppTC = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await authAPI.me();
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
    } finally {
        dispatch(setIsInitializedAC({isInitialized: true}));
    }
}