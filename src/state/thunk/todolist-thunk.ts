import {todolistAPI} from "../../api/todolist-api";
import {
    AddTodolistAC,
    changeTodolistEntityStatusAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    SetTodolistAC
} from "../actions";
import {AppDispatch, AppThunk} from "../store";
import {setAppStatusAC} from "../actions/app-actions";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";

export const fetchTodolistsTC = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await todolistAPI.getTodolist();
        dispatch(SetTodolistAC(res.data));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error) {
        // const error = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            const textError = error.response?.data ? error.response.data.message : error.message
            handleServerNetworkError(textError, dispatch);
        }
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
}


export const removeTodolistsTC = (todolistId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));

    try {
        const res = await todolistAPI.deleteTodolist(todolistId);
        if (res.data.resultCode === 0) {
            dispatch(RemoveTodolistAC(todolistId));
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
        dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'));
    }
}

export const addTodolistsTC = (title: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await todolistAPI.createTodolist(title);
        if (res.data.resultCode === 0) {
            dispatch(AddTodolistAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
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
        dispatch(setAppStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));

        try {
            const res = await todolistAPI.updateTodolistTitle(todolistId, newTodolistTitle);
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodolistTitleAC(todolistId, newTodolistTitle));
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
            dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'));
        }
    }