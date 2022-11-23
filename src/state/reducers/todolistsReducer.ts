import {TodolistType} from "../../AppWithRedux";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "../actions";


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

