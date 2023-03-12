import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Base } from "../../types/base";
import { Pagination } from "../../types/pagination";
import { RootState } from "../store";

export const baseUrl = "https://localhost:7073/";

export function getAll<T>(endpoint:string, name:string) {
    return createAsyncThunk(
        name,
        async (pagination:Pagination | null, thunkAPI) => {
            try {
                let state:RootState = thunkAPI.getState() as RootState;
                let response = await axios.get(
                    `${baseUrl}${endpoint}`, 
                    {
                        headers: { Authorization: `Bearer ${state.user?.token}` }, 
                        params: pagination === null ? {} : { page: pagination.page, pageSize: pagination.pageSize }
                    })
                return response.data as T[]
            } catch (e:any) {
                console.log(e);
            }
        }
    ) 
}
export function get<T>(endpoint:string, name:string) {
    return createAsyncThunk(
        name,
        async (id:number, thunkAPI) => {
            try {
                let state:RootState = thunkAPI.getState() as RootState;
                let response = await axios.get(
                    `${baseUrl}${endpoint}/${id}`,
                    {
                        headers: { Authorization: `Bearer ${state.user?.token}` }
                    })
                return response.data as T[];
            } catch (e:any) {
                console.log(e);
            }
        }
    )
}
export function create<TNew, TReturn>(endpoint:string, name:string) {
    return createAsyncThunk(
        name,
        async (newItem:TNew, thunkAPI) => {
            try {
                let state:RootState = thunkAPI.getState() as RootState;
                let result = await axios.post(
                    `${baseUrl}${endpoint}`,
                    {
                        ...newItem
                    },
                    {
                        headers: { Authorization: `Bearer ${state.user?.token}`}
                    }
                )
                return result.data as TReturn[]
            } catch(e:any) {
                console.log(e);
            }
            
        }
    )
}
export function update<TUp extends Base>(endpoint:string, name:string) {
    return createAsyncThunk(
        name,
        async (updateItem:TUp, thunkAPI) => {
            try {
                let state:RootState = thunkAPI.getState() as RootState;
                let result = await axios.put(
                    `${baseUrl}${endpoint}/${updateItem.id}`,
                    {
                        ...updateItem
                    },
                    {
                        headers: { Authorization: `Bearer ${state.user?.token}`}
                    }
                );
                return result.data as TUp[];
            } catch (e:any) {
                console.log(e);
            }
        }
    )
}
export function remove<T extends Base>(endpoint:string, name:string) {
    return createAsyncThunk(
        name,
        async (item:T, thunkAPI) => {
            try {
                let state:RootState = thunkAPI.getState() as RootState;
                let result = await axios.delete(
                    `${baseUrl}${endpoint}/${item.id}`,
                    {
                        headers: {Authorization: `Bearer ${state.user?.token}`}
                    }
                )
                if (result.data) {
                    //inform succesful delete using item
                } else {
                    throw new Error("Delete operation failed")
                }
            } catch (e:any) {
                console.log(e);
            }
        }
    )
}

