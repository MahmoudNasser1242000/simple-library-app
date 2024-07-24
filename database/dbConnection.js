import mongoose from "mongoose";

const dbConnection = mongoose.connect("mongodb://0.0.0.0:27017/simple_library_system").then(() => {
    console.log("database connected successfully");
}).catch((err) => {
    console.log("error database connection", err);
})

export default dbConnection;