import {todolistAPI} from "../../api/todolist-api";
import {AppDispatch, AppThunk} from "../store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {setAppStatusAC} from "../reducers/app-reducer";
import {
    addTodolistAC,
    changeTodolistEntityStatusAC, changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistAC
} from "../reducers/todolists-reducer";

export enum RESULT_CODE {
    SUCCESS,
    ERROR,
    CAPTCHA = 10
}

export const fetchTodolistsTC = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await todolistAPI.getTodolist();
        dispatch(setTodolistAC({todolists: res.data}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
    } catch (error) {
        // const error = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            const textError = error.response?.data ? error.response.data.message : error.message
            handleServerNetworkError(textError, dispatch);
        }
    }
}


export const removeTodolistsTC = (todolistId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}));

    try {
        const res = await todolistAPI.deleteTodolist(todolistId);
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(removeTodolistAC({todolistId: todolistId}));
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
        dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'idle'}));
    }
}

export const addTodolistsTC = (title: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const res = await todolistAPI.createTodolist(title);
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(addTodolistAC({todolist: res.data.data.item}));
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

export const updateTodolistsTitleTC = (todolistId: string, newTodolistTitle: string): AppThunk =>
    async (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}));

        try {
            const res = await todolistAPI.updateTodolistTitle(todolistId, newTodolistTitle);
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(changeTodolistTitleAC({todolistId, newTodolistTitle}));
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
            dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'idle'}));
        }
    }