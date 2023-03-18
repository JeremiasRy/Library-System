import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditUser, SignIn, SignUp, User } from "../../types/user";
import { RootState } from "../store";
import { baseUrl } from "./baseActions";
import { addNotification } from "./notificationReducer";

const initialState:User | null = null as User | null

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        logout: () => {
            return null as User | null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (_, action) => {
            return action.payload;
        });
    }
});

export default userReducer.reducer;
export const { logout } = userReducer.actions;

export const login = createAsyncThunk(
    "login",
    async (credentials:SignIn, thunkAPI) => {
        try {
            thunkAPI.dispatch(addNotification({message: "Logging in...", timeInSec: 5, type: "normal"}))
            let result = await axios.post(`${baseUrl}Users/login`, credentials);
            if (result.status === 204) {
                thunkAPI.dispatch(addNotification({message: "Failed to login, check your email and password", timeInSec: 2, type: "normal"}))
                return;
            }
            let user:User = result.data;
            thunkAPI.dispatch(addNotification({message: `Logged in as ${user.username}`, timeInSec: 2, type: "normal"}))
            return user;
        } catch (e:any) {
            thunkAPI.dispatch(addNotification({message: `Something went wrong ${e.message}`, timeInSec: 2, type: "error"}))
        }
    }
)
export const register = createAsyncThunk(
    "register",
    async (form:SignUp, thunkAPI) => {
        try {
            let result = await axios.post(`${baseUrl}Users/register`, form);
            if (result.status === 204) {
                thunkAPI.dispatch(addNotification({message: "Failed to register, check your email and password", timeInSec: 2, type: "normal"}))
                return;
            }
            thunkAPI.dispatch(addNotification({message: "Register success please login", timeInSec: 2, type: "normal"}))
        } catch (e:any) {
            thunkAPI.dispatch(addNotification({message: `Something went wrong ${e.message}`, timeInSec: 2, type: "error"}))
        }   
    }
)
export const checkAuth = createAsyncThunk(
    "checkAuthorization",
    async (_, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(`${baseUrl}Users`,
            {
                headers: { Authorization: `Bearer ${state.user?.token}`}
            });
            if (result.status === 401) {
                thunkAPI.dispatch(logout());
                thunkAPI.dispatch(addNotification({message: "Session expired please login again", timeInSec: 2, type: "normal"}))
            }
        } catch (e:any) {
            thunkAPI.dispatch(logout());
        }
    }
)
export const editUser = createAsyncThunk(
    "editUser",
    async (update:EditUser, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.put(`${baseUrl}Users/${update.id}`,
            {
                ...update
            },
            {
                headers: { Authorization: `Bearer ${state.user?.token}`}
            });
            console.log(result.data);
            if (result.data) {
                thunkAPI.dispatch(addNotification({message: "Edited user information", timeInSec: 2, type: "normal"}));
                thunkAPI.dispatch(login({email: update.email, password: update.password}));
            } else {
                thunkAPI.dispatch(addNotification({message: "Failed to edit information", timeInSec: 2, type: "normal"}))
            }
        } catch (e:any) {
            thunkAPI.dispatch(addNotification({message: `Something went wrong ${e.message}`, timeInSec: 2, type: "error"}))
        }
    }
)
