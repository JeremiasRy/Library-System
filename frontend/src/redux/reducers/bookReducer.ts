import { createSlice } from "@reduxjs/toolkit";
import { Book, PostBook } from "../../types/book";
import { create, get, getAll, remove, update } from "./baseActions";

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
    }
})

export default bookReducer.reducer;

export const getAllBooks = getAll<Book>("Books", "getAllBooks");
export const getBookById = get<Book>("Books", "getBookById"); 
export const createBook = create<PostBook, Book>("Books", "createBook");
export const updateBook = update<Book>("Books", "updateBook");
export const deleteBook = remove<Book>("Books", "deleteBook");
