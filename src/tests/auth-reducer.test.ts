import {authReducer, InitialStateType, setIsLoggedInAC} from "../state/reducers/auth-reducer";

let startState: InitialStateType;

beforeEach(() => {

    startState = {
        isLoggedIn: false
    };
})


test('correct status logged in should be set', () => {
    const action = setIsLoggedInAC({isLoggedIn: true});

    const endState = authReducer(startState, action);

    expect(endState.isLoggedIn).toBe(true);
});