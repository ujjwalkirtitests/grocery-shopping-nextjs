import { IOrder, IPayment, IProduct, OrderStatus, UserData } from "@/types";


async function clientSidePaymentHandler(currentUser: UserData, items: IProduct[], toast: any, router: any, clearCart: () => void) {
    const amount =
        items.reduce(function (total, currentItem: IProduct) {
            total += currentItem.price;
            return total;
        }, 0) * 100;
    const order = {
        amount: amount,
        currency: "INR",
        receipt: "receipt#1",
    };
    const response = await fetch("/api/payment/create-order", {
        method: "POST",
        body: JSON.stringify(order),
    });
    const createdOrder = await response.json();
    if (createdOrder.error) {
        toast({
            title: "Something went wrong",
            description: "Please try again",
        });
        return;
    }
    paymentHandler(amount, createdOrder.id, items, currentUser, toast, router, clearCart);
}







async function paymentHandler(amount: number, id: string, products: IProduct[], userDetails: UserData, toast: any, router: any, clearCart: () => void) {
    var options = {
        "key_id": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, // Enter the Key ID generated from the Dashboard
        "amount": amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Instant Order", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response: any) {

            const order: IOrder = {
                amount: amount,
                currency: "INR",
                products: products,
                status: OrderStatus.PENDING,
                user: userDetails,
                receipt: "ds"
            }

            const payment: IPayment = {
                amount: amount,
                user: userDetails,
                currency: "INR",
                payment_gateway_order_id: response.razorpay_order_id,
                payment_gateway_payment_id: response.razorpay_payment_id,
                payment_gateway_signature: response.razorpay_signature,
                status: OrderStatus.COMPLETED,
                payment_method: "Razorpay",
                order: order
            }

            const apiResponse = await fetch('/api/orders/create', {
                method: 'POST',
                body: JSON.stringify({ order: order, payment: payment })
            })

            if (apiResponse.status !== 201) {

                toast({
                    variant: "destructive",
                    title: "Sorry, the payment failed.",
                    description: "Please try again."
                })
            } else {
                toast({
                    title: "Payment successful",
                    description: "Your order is being processed."

                })
                const data = await apiResponse.json()
                clearCart();
                router.push(`/orders/${data.order._id}`)
            }
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": userDetails.username, //your customer's name
            "email": userDetails.email,
            "contact": userDetails.phone,
            //Provide the customer's phone number for better conversion rates
        },
        "notes": {
            "address": "Instant Orders Address"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    //@ts-ignore
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
        toast({
            variant: "destructive",
            title: "Sorry, the payment failed!",
            description: response.error.description
        })
    })
}



export { paymentHandler, clientSidePaymentHandler };
