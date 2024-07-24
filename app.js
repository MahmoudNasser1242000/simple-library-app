import express from "express"
import dbConnection from "./database/dbConnection.js";
import authorRouter from "./src/modules/user/user.routes.js";
import bookRouter from "./src/modules/book/book.routes.js";

const app = express();
app.use(express.json())

dbConnection;

app.use("/api/v1/authors", authorRouter)
app.use("/api/v1/books", bookRouter)

app.get('/', (req, res) => {
    res.send('Welcome to our simple library system');
})

app.use('*', (req, res) => {
    res.send('404 page not found');
})

app.listen(3000, () => {
    console.info(`Server listen on port 3000`);
})