import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "../actions";
import {TodolistType} from "../../api/todolist-api";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistBllType = TodolistType & {
    filter: FilterValuesType
}

export type AllActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>;

const initialState: TodolistBllType[] = [];

export const todolistsReducer = (state: TodolistBllType[] = initialState, action: AllActionType): TodolistBllType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId);
        case 'ADD-TODOLIST':
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                },
                ...state
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t);
        default:
            return state;
    }
};

