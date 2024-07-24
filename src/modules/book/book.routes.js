import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getOneBook, updateBook } from "./book.controller.js";
import { checkAuthorId } from "../../middlewares/checkAuthorId.js";
import { checkBookAndAuthor } from "../../middlewares/checkBookAndAuthor.js";
import { checkBookId } from "../../middlewares/checkBookId.js";

const bookRouter = Router();

bookRouter.post("/:authorId", checkAuthorId, checkBookAndAuthor, addBook)
bookRouter.get("/", getAllBooks)
// bookRouter.get("/:bookId", checkBookId, getOneBook)
// bookRouter.patch("/:bookId", checkAuthorId, updateBook)
// bookRouter.delete("/:bookId", deleteBook)

bookRouter.route("/:bookId")
    .get(getOneBook)
    .patch(checkAuthorId, updateBook)
    .delete(deleteBook)

export default bookRouter;