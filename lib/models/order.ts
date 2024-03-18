import mongoose, { Schema } from "mongoose";
import { ProductSchema } from "./product";
import { models } from "mongoose";
import { IOrder, OrderStatus } from "@/types";



const OrderSchema = new mongoose.Schema<IOrder>({
    products: { type: [ProductSchema], required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true, enum: Object.values(OrderStatus) },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    receipt: { type: String, required: true },

}, { timestamps: true });

const Order = models.Order || mongoose.model<IOrder>('Order', OrderSchema);


export { Order, OrderSchema }
