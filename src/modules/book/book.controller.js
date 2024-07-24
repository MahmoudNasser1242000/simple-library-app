import mongoose from "mongoose";
import authorModel from "../../../database/models/author.model.js";
import bookModel from "../../../database/models/book.model.js"

export const addBook = async (req, res) => {
    const { authorId } = req.params
    try {
        const book = await bookModel.insertMany({ ...req.body, author: authorId });
        if (book) {
            const author = req.author;
            author.books.push(book[0]._id)
            author.save();

            res.status(201).json({ msg: "Book added successfully", book })
        }
    } catch (error) {
        res.status(400).json({ msg: "can't add book", error })
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(200).json({ length: books.length, books })
    } catch (error) {
        res.status(400).json({ msg: "can't find books", error })
    }
}

export const getOneBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await bookModel.findById(bookId);
        if(!book)
            return res.status(400).json({msg: "Cant't find book with this id"})
        
        res.status(200).json({ book })
    } catch (error) {
        res.status(400).json({ msg: "can't find book", error })
    }
}

export const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { author } = req.body;
    try {
        const book = await bookModel.findByIdAndUpdate(bookId, { ...req.body });
        if (!book)
            return res.status(400).json({ msg: "This book is not defined" });
        if (author) {
            const newAuthor = req.author;
            newAuthor.books.push(book._id);
            newAuthor.save();

            updateOldAuthorBook(book)
        }
        res.status(200).json({ msg: "Book updated successfully", book });
    } catch (error) {
        res.status(400).json({ msg: "can't find book", error })
    }
}

export const deleteBook = async (req, res) => {
    const {bookId} = req.params
    try {
        const book = await bookModel.findByIdAndDelete(bookId);
        if(!book)
            return res.status(400).json({msg: "Cant't find book with this id"})

        updateOldAuthorBook(book)
        res.status(200).json({msg: "Book deleted successfully", book});
    } catch (error) {
        res.status(400).json({msg: "can't delete book", error})
    }
}

const updateOldAuthorBook = async (book) => {
    const oldAuthor = await authorModel.findById(book.author);
    oldAuthor.books = oldAuthor.books.filter((_) => !book._id);
    oldAuthor.save()
}