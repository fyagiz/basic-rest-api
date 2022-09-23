import express from "express";
import bookController from "../controllers/bookController";

const router = express.Router();

router.post("/", bookController.addBook);
export = router;
