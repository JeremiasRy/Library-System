import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { User } from "../types/user";
import bookReducer from "./reducers/bookReducer";
import userReducer from "./reducers/userReducer";

let preUser:User | null = null as User | null;
let user = localStorage.getItem("user");

const preLoadedState = {
    user: preUser
}

if (preUser === null) {
    preUser = JSON.parse(user as string);
}
function saveState(state:RootState) {
    try {
        let user = JSON.stringify(state.user);
        localStorage.setItem("user", user);
    } catch {
        console.log("Something went wrong while loading session")
    }
};

export const createStore = () => {
    return configureStore({
        reducer: {
            book: bookReducer,
            user: userReducer
        },
        preloadedState: preLoadedState
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
