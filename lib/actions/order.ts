import { ObjectId } from "mongodb";
import { Order } from "../models/order";
import { IOrder, IProduct } from "@/types";
import { connectToDatabase } from "../mongodb";
import mongoose from "mongoose";
import { Product } from "../models/product";



async function createOrder(order: IOrder): Promise<IOrder | null> {

    let productIds: string[] = []
    let updatedProducts: IProduct[] = [];
    order.products.forEach(product => productIds.push(product._id as string));
    const orderObject = {
        ...order,
        products: productIds,
    }

    const newOrder = new Order(orderObject);
    try {

        await connectToDatabase();
        const session = await mongoose.startSession();
        session.startTransaction();

        // aggregating products
        let aggregatedproductsIdsInOrder: { id: string, quantity: number }[] = []
        for (let i = 0; i < productIds.length; i++) {
            const index = aggregatedproductsIdsInOrder.findIndex(agregatedProduct => agregatedProduct.id === productIds[i])
            if (index !== -1) {
                aggregatedproductsIdsInOrder[index].quantity += 1;
            } else {
                aggregatedproductsIdsInOrder.push({ id: productIds[i], quantity: 1 })
            }
        }


        for (const product of aggregatedproductsIdsInOrder) {
            const _product = await Product.findById(product.id);
            if (!_product) {
                throw new Error(`Product with ID ${product.id} not found`);
            }

            // Check if the product has sufficient stock
            if (_product.stock < 1) {
                throw new Error(`Insufficient stock for product with ID ${_product._id}`);
            }

            // Decrease the stock of the product by 1
            _product.stock -= product.quantity;

            // Save the updated product document
            const updatedProduct = await _product.save();
            updatedProducts.push(updatedProduct);
        }

        // Save the order after updating product stock
        const savedOrder = await newOrder.save();
        await session.commitTransaction();
        session.endSession();
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


async function getOrdersByStatus(status: string, currentPage: number): Promise<{ orders: IOrder[], totalPages: number } | null> {
    try {
        await connectToDatabase()
        const pageSize = 20;
        const orderCount = await Order.countDocuments()
        const totalPages = Math.ceil(orderCount / pageSize);
        const orders = await Order.find({ status: status }).skip(pageSize * currentPage).limit(20).populate('user')
        if (orders) {
            return JSON.parse(JSON.stringify({ orders, totalPages }))
        } else {
            return JSON.parse(JSON.stringify(({ orders: null, totalPages })));
        }
    } catch (error) {
        console.error(error)
        return  JSON.parse(JSON.stringify(({ orders: null, totalPages:0 }));
    }

}



async function updateOrder(orderId: string, updates: Partial<IOrder>): Promise<IOrder | null> {
    if (!orderId) throw Error('Order ID is required!')

    try {
        await connectToDatabase();
        const order = await Order.findByIdAndUpdate(orderId, updates, { new: true }).exec();
        if (order) {
            console.log('Order updated:', order);
            return order;
        } else {
            console.log('No user found with id:', orderId);
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export { createOrder, getOrdersForUser, getOrderDetails, getOrdersByStatus, updateOrder }
