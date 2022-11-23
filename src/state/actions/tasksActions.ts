import {v1} from "uuid";

export const RemoveTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const);

export const AddTaskAC = (todolistId: string, newTaskTitle: string) =>
    ({type: 'ADD-TASK', todolistId, taskId: v1(), newTaskTitle} as const);

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) =>
    ({type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const);

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) =>
    ({type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTaskTitle} as const);