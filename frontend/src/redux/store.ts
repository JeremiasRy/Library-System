import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { User } from "../types/user";
import authorReducer from "./reducers/authorReducer";
import bookReducer from "./reducers/bookReducer";
import categoryReducer from "./reducers/categoryReducer";
import copyReducer from "./reducers/copyReducer";
import loanReducer from "./reducers/loanReducer";
import notificationReducer from "./reducers/notificationReducer";
import publisherReducer from "./reducers/publisherReducer";
import userReducer from "./reducers/userReducer";

let preUser:User | null = null as User | null;
const user = localStorage.getItem("user");

if (preUser === null) {
    try {
        preUser = JSON.parse(user as string);
    } catch {
        console.log("Something went wrong while loading session");
    }
    
}

function saveState(state:RootState) {
    try {
        let user = JSON.stringify(state.user);
        localStorage.setItem("user", user);
    } catch {
        console.log("Something went wrong while loading session");
    }
};
const preLoadedState = {
    user: preUser
}

export const createStore = () => {
    return configureStore({
        reducer: {
            book: bookReducer,
            user: userReducer,
            category: categoryReducer,
            author: authorReducer,
            publisher: publisherReducer,
            copy: copyReducer,
            loan: loanReducer,
            notification: notificationReducer
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
