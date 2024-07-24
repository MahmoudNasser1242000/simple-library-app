import { Router } from "express";
import { checkAuthorName } from "../../middlewares/checkAuthorName.js";
import { addAuthor, deleteAuthor, getAuthors, getOneAuthor, updateAuthor } from "./user.controller.js";
import { checkBookId } from "../../middlewares/checkBookId.js";
import { checkAuthorId } from "../../middlewares/checkAuthorId.js";

const authorRouter = Router();

authorRouter.post("/", checkAuthorName, checkBookId, addAuthor)
authorRouter.get("/", getAuthors)
// authorRouter.get("/:authorId", checkAuthorId, getOneAuthor)
// authorRouter.patch("/:authorId", updateAuthor)
// authorRouter.delete("/:authorId", deleteAuthor)

authorRouter.route("/:authorId")
    .get(getOneAuthor)
    .patch(updateAuthor)
    .delete(deleteAuthor)

export default authorRouter;