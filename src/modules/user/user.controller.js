import authorModel from "../../../database/models/author.model.js";

export const addAuthor = async (req, res) => {
    const {bookId, birthDate} = req.body
    try {
        const author = await authorModel.insertMany({...req.body, birthDate: new Date(birthDate)});
        if (author) {
            if (bookId) {
                author.books.push(bookId)
                author.save();

                const book = req.book;
                book.author = author._id
                book.save();
            }
            res.status(201).json({author})
        }
    } catch (error) {
        res.status(400).json({msg: "can't add user", error})
    }
}

export const getAuthors = async (req, res) => {
    try {
        const authors = await authorModel.find();
        res.status(201).json({length: authors.length, authors})
    } catch (error) {
        res.status(400).json({msg: "can't find authors", error})
    }
}

export const getOneAuthor = async (req, res) => {
    const {authorId} = req.params;
    try {
        const author = await authorModel.findById(authorId);
        if(!author)
            return res.status(400).json({msg: "Cant't find author with this id"})
        res.status(201).json({author})
    } catch (error) {
        res.status(400).json({msg: "can't find author", error})
    }
}

export const updateAuthor = async (req, res) => {
    const {authorId} = req.params
    try {
        const author = await authorModel.findByIdAndUpdate(authorId, {...req.body}, {new: true});
        if(!author)
            return res.status(400).json({msg: "Cant't find author with this id"})
        res.status(200).json({msg: "Auther updated successfully", author});
    } catch (error) {
        res.status(400).json({msg: "can't update author", error})
    }
}

export const deleteAuthor = async (req, res) => {
    const {authorId} = req.params
    try {
        const author = await authorModel.findByIdAndDelete(authorId);
        if(!author)
            return res.status(400).json({msg: "Cant't find author with this id"})
        res.status(200).json({msg: "Author deleted successfully", author});
    } catch (error) {
        res.status(400).json({msg: "can't delete author", error})
    }
}