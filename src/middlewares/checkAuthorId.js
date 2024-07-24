import authorModel from "../../database/models/author.model.js";

export const checkAuthorId = async (req, res, next) => {
    const {authorId} = req.params;
    const {author: author_id} = req.body;

    if (!author_id && !authorId) return;
    try {
        const author = await authorModel.findById(authorId || author_id);
        if (!author) 
            return res.status(400).json({msg: "Author is not defined"});
        req.author = author
        next()
    } catch (error) {
        res.status(400).json({msg: "can't find author", error})
    }
}