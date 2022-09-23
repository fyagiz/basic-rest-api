import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import logger from "../config/logger";
import Book from "../models/book";

const NAMESPACE = "Health Check Controller";

async function addBook(req: Request, res: Response, next: NextFunction) {
    logger.info(NAMESPACE, `/api/v1/book`);

    let { title, author, genre } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author,
        genre,
    });

    return book
        .save()
        .then((result) => {
            return res.status(201).json({ book: result });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error,
            });
        });
}

async function getBooks(req: Request, res: Response, next: NextFunction) {
    logger.info(NAMESPACE, `/api/v1/book`);

    Book.find()
        .exec()
        .then((result) => {
            return res.status(200).json({
                books: result,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error,
            });
        });
}

export default { addBook, getBooks };
