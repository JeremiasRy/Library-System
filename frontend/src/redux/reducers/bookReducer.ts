import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Book, PostBook, } from "../../types/book";
import { RootState } from "../store";
import { create, get, getAll, remove, update, baseUrl } from "./baseActions";

const initialState:Book[] = [];

const bookReducer = createSlice({
    name: "bookReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getBookById.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(createBook.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(updateBook.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getBooksByCategory.fulfilled, (_, action) => {
            return action.payload;
        })
    }
})

export default bookReducer.reducer;

export const getAllBooks = getAll<Book>("Books", "getAllBooks");
export const getBookById = get<Book>("Books", "getBookById"); 
export const createBook = create<PostBook, Book>("Books", "createBook");
export const updateBook = update<Book>("Books", "updateBook");
export const deleteBook = remove<Book>("Books", "deleteBook");
export const getBooksByCategory = createAsyncThunk(
    "getBooksByCategory",
    async (categoryId:number, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(
                `${baseUrl}Books/filter`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`},
                    params: { category: categoryId }
                });
            return result.data as Book[];
        } catch (e:any) {
            console.log(e);
        }
    }
);
