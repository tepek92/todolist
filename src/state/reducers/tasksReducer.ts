import {
    AddTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    RemoveTodolistAC, SetTasksAC, SetTodolistAC, UpdateTaskAC
} from "../actions";
import {TaskType} from "../../api/task-api";

export type TasksStateType = {
    [key: string]: TaskType[]
};

export type AllTaskActionType =
    ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof SetTodolistAC>
    | ReturnType<typeof SetTasksAC>
    | ReturnType<typeof UpdateTaskAC>;


const initialState: TasksStateType = {};
export const tasksReducer = (state: TasksStateType = initialState, action: AllTaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return (
                {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
                }
            );
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        // case 'CHANGE-TASK-STATUS':
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map
        //         (
        //             t => t.id === action.taskId
        //                 ? {...t, status: action.status}
        //                 : t
        //         )
        //     }
        // case 'CHANGE-TASK-TITLE':
        //     return {
        //         ...state,
        //         [action.todolistId]:
        //             state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.newTaskTitle} : t)
        //     }
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
            action.todolists.forEach(td => stateCopy[td.id] = [] as TaskType[]);
            return stateCopy
        case "SET-TASKS":
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state;
    }
};
