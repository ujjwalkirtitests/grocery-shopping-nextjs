import mongoose from "mongoose";
import { ProductSchema } from "./product";
import { UserSchema } from "./user";
import { models } from "mongoose";
import { IOrder } from "@/types";

const OrderSchema = new mongoose.Schema<IOrder>({
    products: { type: [ProductSchema], required: true },
    user: { type: UserSchema, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

const Order = models.Order || mongoose.model<IOrder>('Order', OrderSchema);


export { Order, OrderSchema }
