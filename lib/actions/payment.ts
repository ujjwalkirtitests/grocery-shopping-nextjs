import { IPayment } from "@/types";
import { connectToDatabase } from "../mongodb";
import { Payment } from "../models/payment";



async function addPayment(payment: IPayment): Promise<IPayment | null> {
    const paymentObject = {
        ...payment,
        user: payment.user._id,
        order: payment.order,

    }
    const newPayment = new Payment(paymentObject);
    try {
        await connectToDatabase();
        const savedProduct = await newPayment.save();
        return JSON.parse(JSON.stringify(savedProduct));
    } catch (error) {
        console.error(error);
        return null;
    }
}




export { addPayment }
