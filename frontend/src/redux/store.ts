import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";


function saveState(state:RootState) {
    throw new Error();
};

export const createStore = () => {
    return configureStore({
        reducer: {}
    });
};

export const store = createStore();

store.subscribe(() => saveState(store.getState()))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
