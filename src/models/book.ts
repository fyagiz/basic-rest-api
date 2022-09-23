import mongoose, { Schema } from "mongoose";
import IBook from "../interfaces/IBook";

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
    },
    { versionKey: false }
);

export default mongoose.model<IBook>("Book", BookSchema);
