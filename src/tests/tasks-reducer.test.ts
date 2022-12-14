import { v1 } from 'uuid'
import {tasksReducer} from "../state/reducers";
import {
    addTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    TasksStateType,
    updateTaskAC
} from "../state/reducers/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";
import {RequestStatusType} from "../state/reducers/app-reducer";
import {
    addTodolistAC,
    clearTodolistsDataAC,
    removeTodolistAC,
    setTodolistAC
} from "../state/reducers/todolists-reducer";

let todolistId1: string;
let todolistId2: string;

let taskId1: string;
let taskId2: string;
let taskId3: string;

let startState: TasksStateType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    taskId1 = v1();
    taskId2 = v1();
    taskId3 = v1();

    startState = {
        [todolistId1]: [
            {id: taskId1, title: 'CSS', todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId2, title: 'JS', todoListId: todolistId1, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId3, title: 'React', todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ],
        [todolistId2]: [
            {id: taskId1, title: 'bread', todoListId: todolistId2, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId2, title: 'milk', todoListId: todolistId2, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId3, title: 'tea', todoListId: todolistId2, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ]
    };
})


test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({todolistId: todolistId2, taskId: taskId3});

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        [todolistId1]: [
            {id: taskId1, title: 'CSS', todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId2, title: 'JS', todoListId: todolistId1, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId3, title: 'React', todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ],
        [todolistId2]: [
            {id: taskId1, title: 'bread', todoListId: todolistId2, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId2, title: 'milk', todoListId: todolistId2, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
        ]
    });
});

test('correct task should be added to correct array', () => {

    const newTask =
        {
            id: v1(),
            todoListId: todolistId2,
            title: 'juce',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            description: '',
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
        }
    const action = addTaskAC({task: newTask});

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('juce');
    expect(endState[todolistId2][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
    const action = updateTaskAC({todolistId: todolistId2, taskId: taskId2, model: {status: TaskStatuses.New}});

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][1].id).toBeDefined();
    expect(endState[todolistId2][1].title).toBe('milk');
    expect(startState[todolistId1][1].status).toBe(TaskStatuses.Completed);
    expect(endState[todolistId2][1].status).toBe(TaskStatuses.New);
});

test('correct tasks should change its title', () => {
    const newTitle = 'New test title';

    const endState = tasksReducer(startState, updateTaskAC({todolistId: todolistId1, taskId: taskId1, model: {title: newTitle}}));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId1][0].title).toBe(newTitle);
});

test('new array should be added when new todolist is added', () => {
    const newTodolist = {
        id: v1(),
        title: 'new todolist',
        filter: 'all',
        addedDate: '',
        order: 0
    }
    const action = addTodolistAC({todolist: newTodolist});


    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('deleted tasks when todolist is deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC({todolistId: todolistId2}));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
});

test('empty arrays should be added when we set ??odolists', () => {
    const endState = tasksReducer({}, setTodolistAC({todolists: [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0}
    ]}));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState[todolistId1]).toEqual([]);
    expect(endState[todolistId2]).toEqual([]);
});

test('task should be added for todolist', () => {
    const tasks = [
            {id: taskId1, title: 'CSS', todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId2, title: 'JS', todoListId: todolistId1, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'},
            {id: taskId3, title: 'React', todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: '', entityStatus: 'idle'}
        ];

    const endState = tasksReducer({[todolistId1]: [], [todolistId2]: []}, setTasksAC({todolistId: todolistId1, tasks}));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][0].todoListId).toBe(todolistId1);
    expect(endState[todolistId1][2].entityStatus).toBe('idle');
});

test('correct entity status of tasks should be changed', () => {
    let newEntityStatus: RequestStatusType = 'loading';

    const endState = tasksReducer(startState, changeTaskEntityStatusAC({todolistId: todolistId2, taskId: taskId1, entityStatus: newEntityStatus}));

    expect(endState[todolistId2][0].entityStatus).toBe(newEntityStatus);
    expect(endState[todolistId2][1].entityStatus).toBe('idle');
});

test('tasks should be completely deleted after logout', () => {
    const endState = tasksReducer(startState, clearTodolistsDataAC());

    const keys = Object.keys(endState);

    expect(keys.length).toBe(0);
});

