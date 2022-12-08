import {v1} from "uuid";
import {FilterValuesType} from "../reducers/todolistsReducer";

export const RemoveTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId} as const);

export const AddTodolistAC = (newTodolistTitle: string) =>
    ({type: 'ADD-TODOLIST', todolistId: v1(), title: newTodolistTitle} as const);

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title: newTodolistTitle} as const);

export const ChangeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter: newTodolistFilter} as const);