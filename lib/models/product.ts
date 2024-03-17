import mongoose from "mongoose";
import { CategorySchema } from "./category";
import { IProduct } from "@/types";

const ProductSchema = new mongoose.Schema<IProduct>({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: CategorySchema, required: true },
    status: { type: Boolean, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
}, { timestamps: true });

ProductSchema.index({ title: 'text', description: 'text' });

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);


export { Product, ProductSchema }
