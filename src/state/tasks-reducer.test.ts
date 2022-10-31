import { v1 } from 'uuid'
import {TasksStateType} from "../App";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

const todolistId1 = v1();
const todolistId2 = v1();

const taskId1 = v1();
const taskId2 = v1();
const taskId3 = v1();
const taskId4 = v1();


test('correct tasks should be removed', () => {
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId3, title: "Milk", isDone: true},
            {id: taskId4, title: "React Book", isDone: true}
        ]
    };

    const endState = tasksReducer(startState, RemoveTaskAC(todolistId1, taskId1));

    expect(endState[todolistId1].length).toBe(1);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].id).toBe(taskId2);
});

test('correct tasks should be added', () => {
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId3, title: "Milk", isDone: true},
            {id: taskId4, title: "React Book", isDone: true}
        ]
    };

    const newTitle = "Redux";

    const endState = tasksReducer(startState, AddTaskAC(todolistId1, newTitle));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe(newTitle);
});

test('correct tasks should change its status', () => {
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId3, title: "Milk", isDone: true},
            {id: taskId4, title: "React Book", isDone: true}
        ]
    };

    const isDone = false;

    const endState = tasksReducer(startState, ChangeTaskStatusAC(todolistId1, taskId1, isDone));

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].isDone).toBe(isDone);
});

test('correct tasks should change its title', () => {
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId3, title: "Milk", isDone: true},
            {id: taskId4, title: "React Book", isDone: true}
        ]
    };

    const newTitle = 'New test title';

    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId1, taskId1, newTitle));

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe(newTitle);
});

