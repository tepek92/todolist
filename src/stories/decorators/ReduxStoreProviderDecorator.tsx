import React, {ReactNode} from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {tasksReducer, todolistsReducer} from '../../state/reducers'
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const todolistId1 = 'todolistId1';
const todolistId2 = 'todolistId2';

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
//     tasks: {
//         [todolistId1]: [
//             {taskId: v1(), title: 'HTML&CSS', isDone: true},
//             {taskId: v1(), title: 'JS', isDone: false}
//         ],
//         [todolistId2]: [
//             {taskId: v1(), title: 'Milk', isDone: true},
//             {taskId: v1(), title: 'React Book', isDone: false}
//         ]
//     }
// }
    tasks: {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", todoListId: todolistId1, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: v1(), title: "JS", todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", todoListId: todolistId2, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: v1(), title: "React Book", todoListId: todolistId2, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return (
        <Provider
            store={storyBookStore}>{storyFn()}
        </Provider>
    )
}