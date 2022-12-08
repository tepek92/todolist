import axios from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '20e7389f-479c-4b8d-a9f1-c09cf3d4ffb9'
    }
});

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    }
}

export enum TaskStatuses {
    New ,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Mi,
    Urgently,
    Later
}

export type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string
    status: number
    priority: number
    order: number
    addedDate: string
    startDate: string
    deadline: string
}

export type UpdateTaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTaskResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

export const taskAPI = {
    getTask(todolistId: string, pageSize = 10, page = 1) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks?count=${pageSize}&page=${page}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, task: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,
            task)
    }
}