import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Book, PostBook } from '../types/book';
import { dummyData } from './dummyData';

const handler = [
    rest.get("https://localhost:7073/Books", (req, res, ctx) => {
        return res(
            ctx.json(dummyData.books)
        );
    }),
    rest.get("https://localhost:7073/Books/1", (req, res, ctx) => {
        return res(
            ctx.json(dummyData.books.find(book => book.id === 1))
        );
    }),
    rest.post("https://localhost:7073/Books", async (req, res, ctx) => {
        const newBook:PostBook = await req.json()
        const book:Book = {
            title: newBook.title,
            description: newBook.description,
            categories: null,
            authors: null,
            publishers: null,
            copies: null,
            copiesAvailable: null,
            id: dummyData.books.length + 1
        }
        dummyData.books.push(book);
        return res(
            ctx.json(book)
        );
    }),
    rest.put("https://localhost:7073/Books/1", async (req, res, ctx) => {
        const upObj:PostBook = await req.json()
        let updateMe = dummyData.books.find(book => book.id === 1) as Book;
        updateMe.title = upObj.title;
        updateMe.description = upObj.description;
        return res(
            ctx.json(updateMe)
        );
    }),
    rest.delete("https://localhost:7073/Books/1", async (req, res, ctx) => {
        dummyData.books = dummyData.books.filter(book => book.id !== 1);
        return res(
            ctx.json(dummyData.books)
        );
    })
]

const server = setupServer(...handler);
export default server;