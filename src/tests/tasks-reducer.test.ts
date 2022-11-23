import { v1 } from 'uuid'
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    AddTodolistAC
} from "../state/actions";
import {TasksStateType} from "../AppWithRedux";
import {tasksReducer} from "../state/reducers";

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
            {taskId: taskId1, title: 'CSS', isDone: false},
            {taskId: taskId2, title: 'JS', isDone: true},
            {taskId: taskId3, title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {taskId: taskId1, title: 'bread', isDone: false},
            {taskId: taskId2, title: 'milk', isDone: true},
            {taskId: taskId3, title: 'tea', isDone: false}
        ]
    };
})


test('correct task should be deleted from correct array', () => {
    const action = RemoveTaskAC(todolistId2, taskId3);

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        [todolistId1]: [
            {taskId: taskId1, title: 'CSS', isDone: false},
            {taskId: taskId2, title: 'JS', isDone: true},
            {taskId: taskId3, title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {taskId: taskId1, title: 'bread', isDone: false},
            {taskId: taskId2, title: 'milk', isDone: true},
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = AddTaskAC(todolistId2, 'juce');

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][0].taskId).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('juce');
    expect(endState[todolistId2][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const action = ChangeTaskStatusAC(todolistId2, taskId2, false)

    const endState = tasksReducer(startState, action);

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][1].taskId).toBeDefined();
    expect(endState[todolistId2][1].title).toBe('milk');
    expect(startState[todolistId1][1].isDone).toBe(true);
    expect(endState[todolistId2][1].isDone).toBe(false);
});

test('correct tasks should change its title', () => {
    const newTitle = 'New test title';

    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId1, taskId1, newTitle));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId1][0].title).toBe(newTitle);
});

test('new array should be added when new todolist is added', () => {
    const action = AddTodolistAC('new todolist');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})
