import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Base } from "../../types/base";
import { Pagination } from "../../types/pagination";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getAll<T>(endpoint:string, name:string) {
    return createAsyncThunk(
        name,
        async (pagination:Pagination | null, thunkAPI) => {
            try {
                let state = thunkAPI.getState();
                let response = await axios.get(
                    `${baseUrl}${endpoint}`, 
                    {
                        headers: { Authorization: `Bearer ` }, 
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
        async (id:number) => {
            try {
                let response = await axios.get(
                    `${baseUrl}${endpoint}/${id}`,
                    {
                        headers: { Authorization: `Bearer ` }
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
        async (newItem:TNew) => {
            let result = await axios.post(
                `${baseUrl}${endpoint}`,
                {
                    newItem
                },
                {
                    headers: { Authorization: `Bearer `}
                }
            )
            return result.data as TReturn[]
        }
    )
}
export function update<TUp extends Base>(endpoint:string, name:string) {
    return createAsyncThunk(
        name,
        async (updateItem:TUp) => {
            try {
                let result = await axios.put(
                    `${baseUrl}${endpoint}/${updateItem.id}`,
                    {
                        updateItem
                    },
                    {
                        headers: { Authorization: `Bearer `}
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
        async (item:T) => {
            try {
                let result = await axios.delete(
                    `${baseUrl}${endpoint}/${item.id}`,
                    {
                        headers: {Authorization: `Bearer `}
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

