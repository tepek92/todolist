import {
    addTaskAC, addTodolistAC, changeTaskEntityStatusAC, clearTodolistsDataAC,
    removeTaskAC, removeTodolistAC, setTasksAC, setTodolistAC, updateTaskAC
} from "../actions";
import {TaskType} from "../../api/task-api";
import {RequestStatusType} from "./app-reducer";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: AllTaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            };
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case "SET-TODOLISTS":
            let stateCopy = {...state};
            action.todolists.forEach(td => stateCopy[td.id] = [] as TaskBllType[]);
            return stateCopy
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks.map(ts => ({...ts, entityStatus: 'idle'}))};
        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state,
                [action.todolistId]:
                    state[action.todolistId].map(ts => ts.id === action.taskId ? {...ts, entityStatus: action.entityStatus}: ts)}
        case "CLEAR-TODOLISTS-DATA":
            return {}
        default:
            return state;
    }
};

// types

export type TasksStateType = {
    [key: string]: TaskBllType[]
};

export type TaskBllType = TaskType & {
    entityStatus: RequestStatusType
}

export type AllTaskActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | ReturnType<typeof clearTodolistsDataAC>;

