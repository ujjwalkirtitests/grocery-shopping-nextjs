import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String }
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);



export { Category, CategorySchema }
