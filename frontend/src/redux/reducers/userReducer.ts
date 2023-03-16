import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EditUser, SignIn, SignUp, User } from "../../types/user";
import { RootState } from "../store";
import { baseUrl } from "./baseActions";

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
    async (credentials:SignIn) => {
        try {
            let result = await axios.post(`${baseUrl}Users/login`, credentials);
            if (result.status === 204) {
                throw new Error("Login failed");
            }
            let user:User = result.data;
            return user;
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const register = createAsyncThunk(
    "register",
    async (form:SignUp) => {
        try {
            let result = await axios.post(`${baseUrl}Users/register`, form);
            if (result.status === 204) {
                throw new Error("Register failed");
            }
            //Info succesful register and proceed to login
            console.log(result.data);
        } catch (e:any) {
            console.log(e);
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
            if (result.data) {
                //notify success
                console.log(result)
                thunkAPI.dispatch(login({email: update.email, password: update.password}))
            } else {
                //notify failure
            }
        } catch (e:any) {
            console.log(e)
        }
    }
)
