import {
    AddTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    RemoveTodolistAC
} from "../actions";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";

export type TasksStateType = {
    [key: string]: TaskType[]
};

export type AllActionType =
    ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>;

const initialState: TasksStateType = {};
export const tasksReducer = (state: TasksStateType = initialState, action: AllActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return (
                {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
                }
            );
        case 'ADD-TASK':
            const newTask =
                {
                    id: action.taskId,
                    todoListId: action.todolistId,
                    title: action.newTaskTitle,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    description: '',
                    order: 0,
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map
                (
                    t => t.id === action.taskId
                        ? {...t, status: action.isDone ? TaskStatuses.Completed : TaskStatuses.New}
                        : t
                )
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
            return state;
    }
};
