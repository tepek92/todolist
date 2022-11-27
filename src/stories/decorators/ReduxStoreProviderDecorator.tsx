import React, {ReactNode} from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {tasksReducer, todolistsReducer} from '../../state/reducers'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const todolistId1 = 'todolistId1';
const todolistId2 = 'todolistId2';

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        [todolistId1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: false}
        ],
        [todolistId2]: [
            {taskId: v1(), title: 'Milk', isDone: true},
            {taskId: v1(), title: 'React Book', isDone: false}
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