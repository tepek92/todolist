import {appReducer, InitialStateType} from "../state/reducers/app-reducer";
import {setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "../state/actions/app-actions";

let startState: InitialStateType;

beforeEach(() => {

    startState = {
        error: null,
        status: "idle",
        isInitialized: false
    };
})


test('correct error message should be set', () => {
    const action = setAppErrorAC('testing error');

    const endState = appReducer(startState, action);

    expect(endState.error).toBe('testing error');
});

test('correct status should be set', () => {
    const action = setAppStatusAC('loading');

    const endState = appReducer(startState, action);

    expect(endState.status).toBe('loading');
});

test('correct status initialized should be set', () => {
    const action = setIsInitializedAC(true);

    const endState = appReducer(startState, action);

    expect(endState.isInitialized).toBe(true);
});