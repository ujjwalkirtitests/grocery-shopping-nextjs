import { ObjectId } from "mongodb";
import { Order } from "../models/order";
import { IOrder, OrderStatus } from "@/types";
import { connectToDatabase } from "../mongodb";



async function createOrder(order: IOrder): Promise<IOrder | null> {

    let productIds: string[] = []
    order.products.forEach(product => productIds.push(product._id as string));
    const orderObject = {
        products: productIds,
        user: order.user._id,
        status: OrderStatus.PENDING,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
    }
    const newOrder = new Order(orderObject);
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
        const orders = await Order.find({ user: currentUserId });


        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.error(error);
        return null;

    }
}


async function getOrderDetails(orderId: string): Promise<IOrder | null> {
    if (!orderId) throw new Error("OrderId is required");
    try {
        const currentOrderId = new ObjectId(orderId);
        await connectToDatabase();
        const order = await Order.findById(currentOrderId).populate('products').populate('user');
        if (order) {
            return JSON.parse(JSON.stringify(order));

        } else {
            return null
        }
    } catch (error) {
        console.error(error);
        return null
    }
}


export { createOrder, getOrdersForUser, getOrderDetails }
