import {TasksStateType} from "../../AppWithRedux";
import {
    AddTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    RemoveTodolistAC
} from "../actions";

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
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.taskId !== action.taskId)};
        case 'ADD-TASK':
            const newTask = {taskId: action.taskId, title: action.newTaskTitle, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.taskId === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.taskId === action.taskId ? {...t, title: action.newTaskTitle} : t)
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
