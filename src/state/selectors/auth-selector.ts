import {AppRootStateType} from "../store";

export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn;
