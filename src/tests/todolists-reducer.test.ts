import {v1} from 'uuid'
import {todolistsReducer} from "../state/reducers";
import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC,
    changeTodolistTitleAC, clearTodolistsDataAC,
    FilterValuesType,
    removeTodolistAC, setTodolistAC,
    TodolistBllType
} from "../state/reducers/todolists-reducer";
import {RequestStatusType} from "../state/reducers/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistBllType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ];
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({todolistId: todolistId1}));

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

    const endState = todolistsReducer(startState, addTodolistAC({todolist: newTodolist}));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, newTodolistTitle}));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, newTodolistFilter: newFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolist should be set to the state', () => {

    const endState = todolistsReducer([], setTodolistAC({todolists: startState}));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
});

test('correct entity status of todolist should be changed', () => {
    let newEntityStatus: RequestStatusType = 'loading';

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({todolistId: todolistId2, entityStatus: newEntityStatus}));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newEntityStatus);
});

test('todolists should be completely deleted after logout', () => {
    const endState = todolistsReducer(startState, clearTodolistsDataAC());

    expect(endState.length).toBe(0);
});

