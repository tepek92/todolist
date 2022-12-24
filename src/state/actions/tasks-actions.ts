import {TaskType} from "../../api/task-api";
import {UpdateTaskModelType} from "../thunk/tasks-thunk";
import {RequestStatusType} from "../reducers/app-reducer";

export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const);

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const);

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model} as const);

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const);

export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) =>
    ({type: "CHANGE-TASK-ENTITY-STATUS", todolistId, taskId, entityStatus} as const);