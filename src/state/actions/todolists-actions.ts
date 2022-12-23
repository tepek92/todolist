import {FilterValuesType} from "../reducers/todolists-reducer";
import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "../reducers/app-reducer";

export const RemoveTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId} as const);

export const AddTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const);

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title: newTodolistTitle} as const);

export const ChangeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter: newTodolistFilter} as const);

export const SetTodolistAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', todolists} as const);

export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, entityStatus} as const)
