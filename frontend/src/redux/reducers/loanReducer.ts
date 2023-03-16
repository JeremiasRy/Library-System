import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Loan, LoanFilter, MakeLoan, UpdateLoan } from "../../types/loan";
import { RootState } from "../store";
import { baseUrl } from "./baseActions";
import { getBookById } from "./bookReducer";

const initialState:Loan[] = [];

const loanReducer = createSlice({
    name: "loanReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllLoans.fulfilled, (_, action) => {
            return action.payload;
        })
        builder.addCase(getLoanById.fulfilled, (_, action) => {
            return action.payload;
        })
        builder.addCase(getLoansByUser.fulfilled, (_, action) => {
            return action.payload;
        })
    },
})

export default loanReducer.reducer;

export const getAllLoans = createAsyncThunk(
    "getAllLoans",
    async (filters:LoanFilter | null, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(
                `${baseUrl}Loans`,
                {
                    headers: { Authorization: `Bearer ${state.user?.token}`},
                    params: filters === null 
                    ? {} 
                    : {
                        userId: filters?.userId,
                        filter: filters?.filter, 
                        page: filters?.pagination?.page, 
                        pageSize: filters?.pagination?.pageSize
                    }
                })
            return result.data as Loan[];
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const getLoanById = createAsyncThunk(
    "getLoanById",
    async (id:number, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(
                `${baseUrl}Loans/${id}`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`}
                });
            return result.data as Loan[];
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const getLoansByUser = createAsyncThunk(
    "getLoansByUser",
    async (loanFilter:LoanFilter | null, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(
                `${baseUrl}Loans/user/${loanFilter?.userId}`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`},
                    params: loanFilter === null 
                    ? {} 
                    : {filter: loanFilter?.filter} 
                });
            return result.data as Loan[];
        } catch (e:any) {
            console.log(e)
        }
    }
)
export const makeLoan = createAsyncThunk(
    "makeLoan",
    async (request:MakeLoan, thunkAPI) => {
        let state:RootState = thunkAPI.getState() as RootState;
        let result = await axios.post(
            `${baseUrl}Loans`,
            {
                ...request
            },
            {
                    headers: {Authorization: `Bearer ${state.user?.token}`}
            });
        return result.data as Loan[];
    }
)
export const updateLoan = createAsyncThunk(
    "updateLoan",
    async (request:UpdateLoan, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.put(
                `${baseUrl}Loans/${request.id}`,
                {
                    returned: request.returned,
                    dueDate: request.dueDate,
                    userId: request.userId 
                },
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`}
                });
            thunkAPI.dispatch(getLoanById(request.id));
        } catch {

        }
    }
)