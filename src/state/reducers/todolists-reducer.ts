import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, clearTodolistsDataAC,
    removeTodolistAC, setTodolistAC
} from "../actions";
import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "./app-reducer";

const initialState: TodolistBllType[] = [];

export const todolistsReducer = (state: TodolistBllType[] = initialState, action: AllTodolistsActionType): TodolistBllType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId);
        case 'ADD-TODOLIST':
            return [
                {...action.todolist, filter: 'all', entityStatus: 'idle'},
                ...state
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t);
        case "SET-TODOLISTS":{
            return action.todolists.map(td => ({...td, filter: 'all', entityStatus: 'idle'}))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(td => td.id === action.todolistId ? {...td, entityStatus: action.entityStatus} : td)
        case "CLEAR-TODOLISTS-DATA":
            return []
        default:
            return state;
    }
};

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

