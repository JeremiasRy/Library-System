import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SignIn, SignUp, User } from "../../types/user";
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