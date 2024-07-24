import bookModel from "../../database/models/book.model.js";

export const checkBookId = async (req, res, next) => {
    const {bookId} = req.body;
    const {bookId: book_id} = req.params;

    if(!bookId && !book_id) {
        next();
        return;
    }
    try {
        const book = await bookModel.findById(bookId || bookId);
        console.log(book);
        if (!book) 
            return res.status(400).json({msg: "This book is not defined"});
        req.book = book
        next()
    } catch (error) {
        res.status(400).json({msg: "can't find book", error})
    }
}