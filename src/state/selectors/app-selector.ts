import {AppRootStateType} from "../store";

export const requestStatusSelector = (state: AppRootStateType) => state.app.status;
export const errorAppSelector = (state: AppRootStateType) => state.app.error;
export const isInitializedAppSelector = (state: AppRootStateType) => state.app.isInitialized;