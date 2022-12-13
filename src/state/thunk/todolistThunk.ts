import {todolistAPI} from "../../api/todolist-api";
import {AddTodolistAC, ChangeTodolistTitleAC, RemoveTodolistAC, SetTodolistAC} from "../actions";
import {AppDispatch, AppThunk} from "../store";


export const fetchTodolistsTC = (): AppThunk => (dispatch: AppDispatch) => {
    todolistAPI.getTodolist()
        .then(res => {
                dispatch(SetTodolistAC(res.data));
        })
}

export const removeTodolistsTC = (todolistId: string): AppThunk => (dispatch: AppDispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(RemoveTodolistAC(todolistId));
            }
        })
}

export const addTodolistsTC = (title: string): AppThunk => (dispatch: AppDispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodolistAC(res.data.data.item));
            }
        })
}

export const updateTodolistsTitleTC = (todolistId: string, newTodolistTitle: string): AppThunk => (dispatch: AppDispatch) => {
    todolistAPI.updateTodolistTitle(todolistId, newTodolistTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodolistTitleAC(todolistId, newTodolistTitle));
            }
        })
}