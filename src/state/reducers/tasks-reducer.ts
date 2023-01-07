import {TaskType} from "../../api/task-api";
import {RequestStatusType} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UpdateTaskModelType} from "../thunk/tasks-thunk";
import {addTodolistAC, clearTodolistsDataAC, removeTodolistAC, setTodolistAC} from "./todolists-reducer";

const initialState: TasksStateType = {};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            const {todolistId, taskId} = action.payload;
            state[todolistId] = state[todolistId].filter(t => t.id !== taskId);
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            const todolistId = action.payload.task.todoListId;
            state[todolistId].unshift({...action.payload.task, entityStatus: 'idle'});
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskModelType }>) => {
            const {todolistId, taskId, model} = action.payload;
            state[todolistId] = state[todolistId].map(t => t.id === taskId ? {...t, ...model} : t)
        },
        setTasksAC: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            const {todolistId, tasks} = action.payload;
            state[todolistId] = tasks.map(ts => ({...ts, entityStatus: 'idle'}));
        },
        changeTaskEntityStatusAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) => {
            const {todolistId, taskId, entityStatus} = action.payload;
            state[todolistId] = state[todolistId].map(ts => ts.id === taskId ? {...ts, entityStatus} : ts);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(setTodolistAC, (state, action) => {
                action.payload.todolists.forEach(td => state[td.id] = [] as TaskBllType[]);
            })
            .addCase(clearTodolistsDataAC, () => {
                return {};
            })
    }

});

export const tasksReducer = tasksSlice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, changeTaskEntityStatusAC} = tasksSlice.actions;


// types

export type TasksStateType = {
    [key: string]: TaskBllType[]
};

export type TaskBllType = TaskType & {
    entityStatus: RequestStatusType
};

export type AllTaskActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>;