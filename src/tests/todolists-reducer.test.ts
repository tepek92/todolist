import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, SetTodolistAC,
} from '../state/actions'
import {v1} from 'uuid'
import {todolistsReducer} from "../state/reducers";
import {FilterValuesType, TodolistBllType} from "../state/reducers/todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistBllType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'succeeded'}
    ];
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolist = {
        id: v1(),
        title: 'New Todolist',
        filter: 'all',
        addedDate: '',
        order: 0
    }

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolist));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolist should be set to the state', () => {

    const endState = todolistsReducer([], SetTodolistAC(startState));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
});


