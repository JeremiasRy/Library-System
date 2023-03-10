import { createSlice } from "@reduxjs/toolkit";
import { Copy, PostCopy } from "../../types/copy";
import { create, get, getAll, remove } from "./baseActions";

const initialState:Copy[] = [];

const copyReducer = createSlice({
    name: "copyReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCopies.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getCopyById.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(createCopy.fulfilled, (_, action) => {
            return action.payload;
        });
    }
});

export default copyReducer.reducer;

export const getAllCopies = getAll<Copy>("Copies", "getAllCopies");
export const getCopyById = get<Copy>("Copies", "getCopyById");
export const createCopy = create<PostCopy, Copy>("Copies", "createCopy");
export const deleteCopy = remove<Copy>("Copies", "deleteCopy");