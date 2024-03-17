import mongoose from "mongoose";
import { UserSchema } from "./user";
import { OrderSchema } from "./order";
import { IPayment } from "@/types";

const PaymentSchema = new mongoose.Schema<IPayment>({

    amount: { type: Number, required: true },
    user: { type: UserSchema, required: true },
    status: { type: String, required: true },
    order: { type: OrderSchema, required: true },
    payment_method: { type: String, required: true },
    currency: { type: String, required: true },
}, { timestamps: true });

const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);


export { PaymentSchema, Payment }
