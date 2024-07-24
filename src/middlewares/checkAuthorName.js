import authorModel from "../../database/models/author.model.js";

export const checkAuthorName = async (req, res, next) => {
    const {name, birthDate} = req.body
    try {
        const author = await authorModel.findOne({name});
        if (author) 
            return res.status(400).json({msg: "Author allready exists"});
        next();
    } catch (error) {
        res.status(400).json({msg: "can't finddd author", error})
    }
}