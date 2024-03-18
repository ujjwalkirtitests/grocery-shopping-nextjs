import { IPayment } from "@/types";
import { connectToDatabase } from "../mongodb";
import { Payment } from "../models/payment";



async function addPayment(payment: IPayment): Promise<IPayment | null> {
    const newPayment = new Payment(payment)
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
