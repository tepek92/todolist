import {authReducer, InitialStateType} from "../state/reducers/auth-reducer";
import {setIsLoggedInAC} from "../state/actions";

let startState: InitialStateType;

beforeEach(() => {

    startState = {
        isLoggedIn: false
    };
})


test('correct status logged in should be set', () => {
    const action = setIsLoggedInAC(true);

    const endState = authReducer(startState, action);

    expect(endState.isLoggedIn).toBe(true);
});