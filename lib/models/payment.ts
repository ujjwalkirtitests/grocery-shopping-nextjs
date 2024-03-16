import mongoose from "mongoose";
import { UserSchema } from "./user";
import { OrderSchema } from "./order";

const PaymentSchema = new mongoose.Schema({

    amount: { type: Number, required: true },
    user: { type: UserSchema, required: true },
    status: { type: String, required: true },
    order: { type: OrderSchema, required: true },
    payment_method: { type: String, required: true },
    currency: { type: String, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);


export { PaymentSchema, Payment }
