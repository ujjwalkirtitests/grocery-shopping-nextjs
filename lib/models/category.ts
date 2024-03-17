import { ICategory } from "@/types";
import mongoose, { models } from "mongoose";

const CategorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String }
}, { timestamps: true });

const Category = models.Category || mongoose.model<ICategory>('Category', CategorySchema);



export { Category, CategorySchema }
