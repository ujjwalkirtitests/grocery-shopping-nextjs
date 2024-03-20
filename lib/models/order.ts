import mongoose, { Schema } from "mongoose";
import { models } from "mongoose";
import { OrderStatus } from "@/types";



const OrderSchema = new mongoose.Schema({
    products: { type: [Schema.Types.ObjectId], ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true, enum: Object.values(OrderStatus) },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    receipt: { type: String, required: true },

}, { timestamps: true });

const Order = models.Order || mongoose.model('Order', OrderSchema);


export { Order, OrderSchema }
