import {TaskType} from "../../api/task-api";
import {UpdateTaskModelType} from "../thunk/tasksThunk";

export const RemoveTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const);

export const AddTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const);

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, status: number) =>
    ({type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const);

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) =>
    ({type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTaskTitle} as const);

export const UpdateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model} as const);

export const SetTasksAC = (todolistID: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistID, tasks} as const)