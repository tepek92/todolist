import {TasksStateType} from "../App";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";

export type AllActionType =
    ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>;

export const tasksReducer = (state: TasksStateType, action: AllActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case 'ADD-TASK':
            const newTask = {id: action.taskId, title: action.newTaskTitle, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.newTaskTitle} : t)
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        default:
            throw new Error('I don\'t understand this type')
    }
};

export const RemoveTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const);

export const AddTaskAC = (todolistId: string, taskId: string, newTaskTitle: string) =>
    ({type: 'ADD-TASK', todolistId, taskId, newTaskTitle} as const);

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) =>
    ({type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const);

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) =>
    ({type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTaskTitle} as const);

