import mongoose from 'mongoose';
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: { type: String, required: true }, // String is shorthand for {type: String}
    bio: String,
    birthDate: Date,
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book",
    }],
}, {
    timestamps: true,
    _v: false
});

const authorModel = mongoose.model('Author', authorSchema);
export default authorModel