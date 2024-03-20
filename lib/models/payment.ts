import mongoose, { Schema } from "mongoose";

const PaymentSchema = new mongoose.Schema({
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

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);


export { PaymentSchema, Payment }
