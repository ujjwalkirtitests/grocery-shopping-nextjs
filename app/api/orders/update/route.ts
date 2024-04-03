import { updateOrder } from "@/lib/actions/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { orderId, updates } = await req.json();

        const updatedOrder = await updateOrder(orderId, updates);
        if (updatedOrder) {
            return NextResponse.json(updatedOrder, {
                status: 200
            })
        } else {
            return NextResponse.json({
                error: "Something went wrong!"
            }, {
                status: 400
            })
        }
    } catch (err) {
        return NextResponse.json({
            error: err
        }, {
            status: 500
        })
    }
}
