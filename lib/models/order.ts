import mongoose from "mongoose";
import { ProductSchema } from "./product";
import { UserSchema } from "./user";

const OrderSchema = new mongoose.Schema({
    products: { type: [ProductSchema], required: true },
    user: { type: UserSchema, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);


export { Order, OrderSchema }
