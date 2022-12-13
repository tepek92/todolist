import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {tasksReducer} from "./reducers";
import {todolistsReducer} from "./reducers";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AllTaskActionType} from "./reducers/tasksReducer";
import {AllTodolistsActionType} from "./reducers/todolistsReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>;
// создаем тип для dispatch, который понимает thunk
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActions>;

// тип всех экшенов приложения
export type AllAppActions = AllTaskActionType | AllTodolistsActionType;

// Тип для того, что возвращает thunk creator
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActions>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;