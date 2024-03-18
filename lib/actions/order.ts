import { ObjectId } from "mongodb";
import { Order } from "../models/order";
import { IOrder } from "@/types";
import { connectToDatabase } from "../mongodb";



async function createOrder(order: IOrder): Promise<IOrder | null> {
    const newOrder = new Order(order);
    try {
        await connectToDatabase();
        const savedOrder = await newOrder.save();
        return JSON.parse(JSON.stringify(savedOrder));
    } catch (error) {
        console.error(error);
        return null;
    }
}



async function getOrdersForUser(userId: string): Promise<IOrder[] | null> {
    if (!userId) throw new Error("UserId is required");
    const currentUserId = new ObjectId(userId);

    try {
        await connectToDatabase();
        const orders = await Order.find({ userId: currentUserId });


        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.error(error);
        return null;

    }
}





export { createOrder, getOrdersForUser }
