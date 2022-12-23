import {AddTodolistAC, RemoveTodolistAC} from "../state/actions";
import {tasksReducer, todolistsReducer} from "../state/reducers";
import {TasksStateType} from "../state/reducers/tasks-reducer";
import {TodolistBllType} from "../state/reducers/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistBllType> = []

    const newTodolist = {
        id: v1(),
        title: 'new todolist',
        filter: 'all',
        addedDate: '',
        order: 0
    }
    const action = AddTodolistAC(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: 'taskId1', title: 'CSS', todoListId: 'todolistId1', status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: 'taskId2', title: 'JS', todoListId: 'todolistId1', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: 'taskId3', title: 'React', todoListId: 'todolistId1', status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ],
        'todolistId2': [
            {id: 'taskId1', title: 'bread', todoListId: 'todolistId2', status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: 'taskId2', title: 'milk', todoListId: 'todolistId2', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: 'taskId3', title: 'tea', todoListId: 'todolistId2', status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ]
    };

    const action = RemoveTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action);


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
});

