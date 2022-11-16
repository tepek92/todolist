import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type AllActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>;

const initialState: TodolistType[] = [];

export const todolistsReducer = (state: TodolistType[] = initialState, action: AllActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId);
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t);
        default:
            return state;
    }
};

export const RemoveTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId} as const);

export const AddTodolistAC = (newTodolistTitle: string) =>
    ({type: 'ADD-TODOLIST', todolistId: v1(), title: newTodolistTitle} as const);

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title: newTodolistTitle} as const);

export const ChangeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter: newTodolistFilter} as const);

