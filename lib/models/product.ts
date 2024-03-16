import mongoose from "mongoose";
import { CategorySchema } from "./category";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    thumbnail: { type: String, required: true },
    timestamp: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: CategorySchema, required: true },
    status: { type: Boolean, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);


export { Product, ProductSchema }
