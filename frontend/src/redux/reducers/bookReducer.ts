import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Assign, Book, PostBook, } from "../../types/book";
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
        });
        builder.addCase(getBooksByPublisher.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getBooksByAuthor.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getBooksByTitle.fulfilled, (_, action) => {
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
export const getBooksByAuthor = createAsyncThunk(
    "getBooksByAuthor",
    async (authorId:number, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(
                `${baseUrl}Books/filter`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`},
                    params: { author: authorId }
                });
            return result.data as Book[];
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const getBooksByPublisher = createAsyncThunk(
    "getBooksByPublisher",
    async (publisherId:number, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(
                `${baseUrl}Books/filter`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`},
                    params: { publisher: publisherId }
                });
            return result.data as Book[];
        } catch (e:any) {
            console.log(e);
        }
    }
);
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
export const getBooksByTitle = createAsyncThunk(
    "getBooksByTitle",
    async (title:string, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.get(
                `${baseUrl}Books/filter`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`},
                    params: { title: title }
                });
            return result.data as Book[];
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const addCategoryToBook = createAsyncThunk(
    "addCategoryToBook",
    async (assign:Assign, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.post(
                `${baseUrl}Books/${assign.id}/categories`,
                {
                    addId: assign.addId
                },
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`}
                }
            )
            if (result.data) {
                thunkAPI.dispatch(getBookById(assign.id))
                //notify success
            } else {
                //notify failure
            }
        } catch (e:any) {
            console.log(e)
        }
    }
);
export const addAuthorToBook = createAsyncThunk(
    "addAuthorToBook",
    async (assign:Assign, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.post(
                `${baseUrl}Books/${assign.id}/authors`,
                {
                    addId: assign.addId
                },
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`}
                }
            )
            if (result.data) {
                thunkAPI.dispatch(getBookById(assign.id))
                //notify success
            } else {
                //notify failure
            }
        } catch (e:any) {
            console.log(e)
        }
    }
);
export const removeCategoryFromBook = createAsyncThunk(
    "removeCategoryFromBook",
    async (assign:Assign, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.delete(
                `${baseUrl}Books/${assign.id}/categories`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`},
                    params: {categoryId: assign.addId}
                }
            )
            if (result.data) {
                thunkAPI.dispatch(getBookById(assign.id));
                //notify success
            } else {
                //notify failure
            }
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const removeAuthorFromBook = createAsyncThunk(
    "removeAuthorFromBook",
    async (assign:Assign, thunkAPI) => {
        try {
            let state:RootState = thunkAPI.getState() as RootState;
            let result = await axios.delete(
                `${baseUrl}Books/${assign.id}/authors`,
                {
                    headers: {Authorization: `Bearer ${state.user?.token}`},
                    params: {authorId: assign.addId}
                }
            )
            if (result.data) {
                thunkAPI.dispatch(getBookById(assign.id));
                //notify success
            } else {
                //notify failure
            }
        } catch (e:any) {
            console.log(e);
        }
    }
)

