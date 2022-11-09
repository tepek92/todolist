import { v1 } from 'uuid'
import {TasksStateType} from "../App";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {AddTodolistAC} from "./todolists-reducer";

const todolistId1 = v1();
const todolistId2 = v1();

const taskId1 = v1();
const taskId2 = v1();
const taskId3 = v1();
const taskId4 = v1();


test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = RemoveTaskAC('todolistId2', '2' )

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
});

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const newTaskId = v1();
    const action = AddTaskAC( 'todolistId2', newTaskId, 'juce')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
});

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = ChangeTaskStatusAC('todolistId2', '2', false)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].id).toBeDefined()
    expect(endState['todolistId2'][1].title).toBe('milk')
    expect(startState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(false)
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

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: 'CSS', isDone: false},
            {id: taskId2, title: 'JS', isDone: true},
            {id: taskId3, title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: taskId1, title: 'bread', isDone: false},
            {id: taskId2, title: 'milk', isDone: true},
            {id: taskId3, title: 'tea', isDone: false}
        ]
    }

    const action = AddTodolistAC('new todolist');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
