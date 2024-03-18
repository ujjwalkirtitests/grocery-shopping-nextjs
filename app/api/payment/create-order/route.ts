import { IOrder } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";


async function createOrder(order: IOrder): Promise<any> {
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, key_secret: process.env.RAZORPAY_KEY_SECRET })

    const orderResponse = await instance.orders.create(order);
    return orderResponse;
}



export async function POST(request: NextRequest, response: NextResponse) {
    const res = await request.json();
    try {
        const orderResponseFromServer = await createOrder(res);
        return NextResponse.json(orderResponseFromServer);

    } catch (error) {
        return NextResponse.json(error);

    }
}
