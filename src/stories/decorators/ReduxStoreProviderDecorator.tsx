import React, {ReactNode} from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {appReducer, tasksReducer, todolistsReducer} from '../../state/reducers'
import {TaskPriorities, TaskStatuses} from "../../api/task-api";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
const todolistId1 = 'todolistId1';
const todolistId2 = 'todolistId2';

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'}
    ],
    tasks: {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", todoListId: todolistId1, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: v1(), title: "JS", todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", todoListId: todolistId2, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: v1(), title: "React Book", todoListId: todolistId2, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ]
    },
    app: {
        status: 'loading',
        error: null
    }
}

export const storyBookStore =
    legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return (
        <Provider
            store={storyBookStore}>{storyFn()}
        </Provider>
    )
}