import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type AllActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>;

export const todolistsReducer = (state: TodolistType[], action: AllActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            // как тут удалять таски в другом стейте??
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            // как тут добавлять таски в другом стейте??
            return [...state, {id: v1(), title: action.title, filter: 'all'}];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t);
        default:
            throw new Error('I don\'t understand this type')
    }
};

export const RemoveTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const);

export const AddTodolistAC = (newTodolistTitle: string) =>
    ({type: 'ADD-TODOLIST', title: newTodolistTitle} as const);

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle} as const);

export const ChangeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: newTodolistFilter} as const);
