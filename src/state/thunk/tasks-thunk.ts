import {
    addTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    updateTaskAC,
    setAppStatusAC
} from "../actions";
import {AppDispatch, AppRootStateType, AppThunk} from "../store";
import {taskAPI, UpdateTaskType} from "../../api/task-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {RESULT_CODE} from "./todolist-thunk";

export const fetchTasksTC = (todolistId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await taskAPI.getTask(todolistId);
        dispatch(setTasksAC(todolistId, res.data.items));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error) {
        if(axios.isAxiosError<AxiosError<{message: string}>>(error)) {
            const textError = error.response?.data ? error.response?.data.message : error.message;
            handleServerNetworkError(textError, dispatch);
        }
    }
};

export const removeTasksTC = (todolistId: string, taskId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
    try {
        const res = await taskAPI.deleteTask(todolistId, taskId);
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(removeTaskAC(todolistId, taskId));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        if(axios.isAxiosError<AxiosError<{message: string}>>(error)) {
            const textError = error.response?.data ? error.response?.data.message : error.message;
            handleServerNetworkError(textError, dispatch);
        }
    } finally {
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'));
    }

};

export const addTaskTC = (todolistID: string, title: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await taskAPI.createTask(todolistID, title);
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        if(axios.isAxiosError<AxiosError<{message: string}>>(error)) {
            const textError = error.response?.data ? error.response?.data.message : error.message;
            handleServerNetworkError(textError, dispatch);
        }
    }

};

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType): AppThunk =>
    async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        const tasks = getState().tasks[todolistId];
        const task = tasks.find(t => t.id === taskId);
        if(!task) {
            throw new Error('task with this id does not exist');
        }
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
        dispatch(setAppStatusAC('loading'));
        const updateTask: UpdateTaskType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }

        try {
            const res = await taskAPI.updateTask(todolistId, taskId, updateTask);
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(updateTaskAC(todolistId, taskId, model));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        } catch (error) {
            if(axios.isAxiosError<AxiosError<{message: string}>>(error)) {
                const textError = error.response?.data ? error.response?.data.message : error.message;
                handleServerNetworkError(textError, dispatch);
            }
        } finally {
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'));
        }
    };


// types

export type UpdateTaskModelType = {
    description?: string
    title?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

// .catch((error: AxiosError<{message: string}>) => {
//     const errorText = error.response ? error.response.data.message : error.message;
//     handleServerNetworkError(errorText, dispatch);
// })

// const error = e as Error | AxiosError<{ error: string }>
