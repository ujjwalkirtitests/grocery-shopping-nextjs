import { createOrder } from "@/lib/actions/order";
import { addPayment } from "@/lib/actions/payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {

    try {
        const orderObject = await request.json();
        const createdOrder = await createOrder(orderObject.order)
        const createdPayment = await addPayment({ ...orderObject.payment, order: createdOrder?._id });
        if (createdOrder && createdPayment) {
            return NextResponse.json({
                order: createdOrder,
            },
                {
                    status: 201,
                })
        } else {
            return NextResponse.json({
                error: "Something went wrong"
            }, {
                status: 400
            })
        }
    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 500
        })
    }


}
