import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    SetTasksAC,
    UpdateTaskAC
} from "../actions";
import {AppDispatch, AppRootStateType, AppThunk} from "../store";
import {taskAPI, UpdateTaskType} from "../../api/task-api";


export const fetchTasksTC = (todolistID: string): AppThunk => (dispatch: AppDispatch) => {
    taskAPI.getTask(todolistID)
        .then(res => {
                dispatch(SetTasksAC(todolistID, res.data.items))
        })
};

export const removeTasksTC = (todolistID: string, taskId: string): AppThunk => (dispatch: AppDispatch) => {
    taskAPI.deleteTask(todolistID, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(RemoveTaskAC(todolistID, taskId))
            }
        })
};

export const addTaskTC = (todolistID: string, title: string): AppThunk => (dispatch: AppDispatch) => {
    taskAPI.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AddTaskAC(res.data.data.item))
            }
        })
};

export type UpdateTaskModelType = {
    description?: string
    title?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

// export const updateTaskStatusTC = (todolistId: string, taskId: string, status: number): AppThunk =>
//     (dispatch: AppDispatch, getState: () => AppRootStateType) => {
//     const tasks = getState().tasks[todolistId];
//     const task = tasks.find(t => t.id === taskId);
//
//     if (task) {
//         const updateTask: UpdateTaskType = {
//             description: task.description,
//             title: task.title,
//             status: status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline
//         }
//
//         taskAPI.updateTask(todolistId, taskId, updateTask)
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(ChangeTaskStatusAC(todolistId, taskId, status))
//                 }
//             })
//     }
// };
//
// export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk =>
//     (dispatch: AppDispatch, getState: () => AppRootStateType) => {
//         const tasks = getState().tasks[todolistId];
//         const task = tasks.find(t => t.id === taskId);
//
//         if (task) {
//             const updateTask: UpdateTaskType = {
//                 description: task.description,
//                 title: title,
//                 status: task.status,
//                 priority: task.priority,
//                 startDate: task.startDate,
//                 deadline: task.deadline
//             }
//
//             taskAPI.updateTask(todolistId, taskId, updateTask)
//                 .then(res => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
//                     }
//                 })
//         }
//     };

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType): AppThunk =>
    (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        const tasks = getState().tasks[todolistId];
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            const updateTask: UpdateTaskType = {
                description: task.description,
                title: task.title,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model
            }

            taskAPI.updateTask(todolistId, taskId, updateTask)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(UpdateTaskAC(todolistId, taskId, model))
                    }
                })
        }
    };