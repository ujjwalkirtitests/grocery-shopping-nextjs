import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    thumbnail: { type: String, required: true },
    unit: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    status: { type: Boolean, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
}, { timestamps: true });

ProductSchema.index({ title: 'text', description: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);


export { Product, ProductSchema }
