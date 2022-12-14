import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, SetTodolistAC
} from "../actions";
import {TodolistType} from "../../api/todolist-api";

const initialState: TodolistBllType[] = [];

export const todolistsReducer = (state: TodolistBllType[] = initialState, action: AllTodolistsActionType): TodolistBllType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId);
        case 'ADD-TODOLIST':
            return [
                {...action.todolist, filter: 'all'},
                ...state
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t);
        case "SET-TODOLISTS":{
            return action.todolists.map(td => ({...td, filter: 'all'}))
        }
        default:
            return state;
    }
};

// types

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistBllType = TodolistType & {filter: FilterValuesType};

export type AllTodolistsActionType =
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof SetTodolistAC>;

