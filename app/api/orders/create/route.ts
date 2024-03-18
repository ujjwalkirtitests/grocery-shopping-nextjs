import { createOrder } from "@/lib/actions/order";
import { addPayment } from "@/lib/actions/payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    const orderObject = await request.json();
    const createdOrder = await createOrder(orderObject.order)
    if (createdOrder) {
        const createdPayment = await addPayment(orderObject.payment);
        if (createdPayment) {
            return NextResponse.json({
                message: "Payment created successfully!"
            }, {
                status: 200
            })
        }
    } else {
        return NextResponse.json({
            message: "There was some error in creating the object!"
        }, {
            status: 400
        })
    }
}
