import bookModel from "../../database/models/book.model.js";

export const checkBookAndAuthor = async (req, res, next) => {
    const {authorId} = req.params;
    const {title} = req.body;
    try {
        const author = await bookModel.findOne({title, author: authorId});
        if (author) 
            return res.status(400).json({msg: "Book is allready exist"});
        next()
    } catch (error) {
        res.status(400).json({error})
    }
}