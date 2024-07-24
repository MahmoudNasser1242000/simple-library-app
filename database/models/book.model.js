import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        title: { type: String, required: true }, // String is shorthand for {type: String}
        content: { type: String, required: true },
        author: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        publishedDate: {
            type: Schema.Types.Date,
            default: new Date()
        },
    },
    {
        timestamps: true,
        _v: false,
    }
);

const bookModel = mongoose.model("Book", bookSchema);
export default bookModel
