import { createSlice } from "@reduxjs/toolkit";
import { Author, CreateAuthor } from "../../types/author";
import { create, get, getAll, remove, update } from "./baseActions";

const initialState:Author[] = [];

const authorReducer = createSlice({
    name: "authorReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAuthors.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getAuthorById.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(createAuthor.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(updateAuthor.fulfilled, (_, action) => {
            return action.payload;
        })

    }
})

export default authorReducer.reducer;

export const getAllAuthors = getAll<Author>("Authors", "getAllAuthors");
export const getAuthorById = get<Author>("Authors", "getAuthorById");
export const createAuthor = create<CreateAuthor, Author>("Authors", "createAuthor");
export const updateAuthor = update<Author>("Authors", "updateAuthor");
export const deleteAuthor = remove<Author>("Authors", "deleteAuthor");