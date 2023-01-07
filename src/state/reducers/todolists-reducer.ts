import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodolistBllType[] = [];

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{todolistId: string}>) => {
            return state.filter(t => t.id !== action.payload.todolistId);
        },
        addTodolistAC: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{todolistId: string, newTodolistTitle: string}>) => {
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTodolistTitle} : t);
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{todolistId: string, newTodolistFilter: FilterValuesType}>) => {
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.newTodolistFilter} : t);
        },
        setTodolistAC: (state, action: PayloadAction<{todolists: TodolistType[]}>) => {
            return action.payload.todolists.map(td => ({...td, filter: 'all', entityStatus: 'idle'}));
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType}>) => {
            return state.map(td => td.id === action.payload.todolistId ? {...td, entityStatus: action.payload.entityStatus} : td);
        },
        clearTodolistsDataAC: () => {
            return [];
        },

    }
})
export const todolistsReducer = todolistsSlice.reducer;
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistAC,
    changeTodolistEntityStatusAC,
    clearTodolistsDataAC
} = todolistsSlice.actions;


// types

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistBllType =
    TodolistType &
    {
    filter: FilterValuesType
    entityStatus: RequestStatusType
    };

export type AllTodolistsActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof clearTodolistsDataAC>;

