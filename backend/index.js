import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {Book} from './bookModel.js';

const PORT = 3000;

const mongoDBURL = `mongodb+srv://root:root@book-store-mern.gkvi8ub.mongodb.net/?retryWrites=true&w=majority&appName=book-store-MERN`

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    // console.log(req);
    res.status(200).send("Hello..!!");
})

app.post("/books", async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "Enter all the required fields"})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});

        res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const book = await Book.findById(id);

        res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.put("/books/:id", async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "Enter all the required fields"})
        }

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({message: "Book not found"});
        }

        return res.status(200).send({message: "Book successfully updated"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({message: "Book not found"});
        }

        return res.status(200).send({message: "Book successfully deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`Port is : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
