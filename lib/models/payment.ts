import mongoose, { Schema } from "mongoose";
import { IPayment } from "@/types";

const PaymentSchema = new mongoose.Schema<IPayment>({
    amount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    payment_method: { type: String },
    currency: { type: String, required: true },
    payment_gateway_order_id: { type: String, required: true },
    payment_gateway_payment_id: { type: String, required: true },
    payment_gateway_signature: { type: String, required: true }
}, { timestamps: true });

const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);


export { PaymentSchema, Payment }
