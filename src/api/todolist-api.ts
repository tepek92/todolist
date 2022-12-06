import axios from "axios";

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type TodolistResponseType<T> = {
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
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<TodolistResponseType<{item: TodolistType}>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<TodolistResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    }
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type UpdateTaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
}

type GetTaskResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

type CreateTaskResponseType = {
    data: {item: TaskType}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
export const taskAPI = {
    getTask(todolistId: string, pageSize = 10, page = 1) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks?count=${pageSize}&page=${page}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TodolistResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TodolistResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, task: UpdateTaskType) {
        return instance.put<TodolistResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            task)
    }
}