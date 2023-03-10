import { createSlice } from "@reduxjs/toolkit";
import { PostPublisher, Publisher } from "../../types/publisher";
import { create, get, getAll, remove, update } from "./baseActions";

const initialState:Publisher[] = [];

const publisherReducer = createSlice({
    name: "publisherReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPublishers.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getPublisherById.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(createPublisher.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(updatePublisher.fulfilled, (_, action) => {
            return action.payload;
        })
    }
});

export default publisherReducer.reducer;

export const getAllPublishers = getAll<Publisher>("Publishers", "getAllPublishers");
export const getPublisherById = get<Publisher>("Publishers", "getPublisherById");
export const createPublisher = create<PostPublisher, Publisher>("Publishers", "createPublisher");
export const updatePublisher = update<Publisher>("Publishers", "updatePublisher");
export const deletePublisher = remove<Publisher>("Publishers", "deletePublisher");