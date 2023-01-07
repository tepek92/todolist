import {
    appReducer,
    InitialStateType,
    setAppErrorAC,
    setAppStatusAC,
    setIsInitializedAC
} from "../state/reducers/app-reducer";

let startState: InitialStateType;

beforeEach(() => {

    startState = {
        error: null,
        status: "idle",
        isInitialized: false
    };
})


test('correct error message should be set', () => {
    const action = setAppErrorAC({error: 'testing error'});

    const endState = appReducer(startState, action);

    expect(endState.error).toBe('testing error');
});

test('correct status should be set', () => {
    const action = setAppStatusAC({status: 'loading'});

    const endState = appReducer(startState, action);

    expect(endState.status).toBe('loading');
});

test('correct status initialized should be set', () => {
    const action = setIsInitializedAC({isInitialized: true});

    const endState = appReducer(startState, action);

    expect(endState.isInitialized).toBe(true);
});