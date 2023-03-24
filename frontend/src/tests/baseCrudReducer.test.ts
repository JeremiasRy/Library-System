import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../redux/reducers/bookReducer";
import { createStore, RootState } from "../redux/store";
import { Book } from "../types/book";
import server from "../utility/mockServer";

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>;

beforeAll(() => {
    server.listen()
});

afterAll(() => {
    server.close()
});

beforeEach(() => {
    store = createStore();
});

describe("base CRUD", () => {
    test("Get all", async () => {
        await store.dispatch(getAllBooks(null));
        let books = store.getState().book;
        expect(books.length).toBe(2);
        expect(books[0].title).toBe("Test1");
        expect(books[1].title).toBe("Test2");
    })
    test("Get one", async () => {
        await store.dispatch(getBookById(1))
        let book = store.getState().book as unknown as Book;
        expect(book.title).toBe("Test1");
    })
    test("Post", async () => {
        await store.dispatch(createBook({title: "I'm new", description: ""}));
        await store.dispatch(getAllBooks(null));
        let books = store.getState().book;
        expect(books.length).toBe(3);
    })
    test("Update", async () => {
        await store.dispatch(updateBook({
            id: 1,
            title: "I've been changed", 
            description: "",
            categories: null,
            authors: null,
            publishers: null,
            copies: null,
            copiesAvailable: null
        }))
        await store.dispatch(getBookById(1));
        let book = store.getState().book as unknown as Book;
        expect(book.title).toBe("I've been changed");
    })
    test("Delete", async () => {
        await store.dispatch(deleteBook({
            id: 1,
            categories: null,
            authors: null,
            publishers: null,
            copies: null,
            copiesAvailable: null,
            title: "",
            description: null
        }))
        await store.dispatch(getAllBooks(null));
        let books = store.getState().book;
        expect(books.length).toBe(2);
    })

})