import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderDetails } from "@/lib/actions/order";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";

interface IOrderSummary {
  item: IProduct;
  quantity: number;
  price: number;
}

function summariseOrder(items: IProduct[]): IOrderSummary[] {
  let ans: IOrderSummary[] = [];
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let index = ans.findIndex((x) => x.item._id === item._id);
    if (index === -1) {
      ans.push({ item, quantity: 1, price: item.price });
    } else {
      ans[index].quantity++;
      ans[index].price += item.price;
    }
  }

  return ans;
}

async function OrderDetails({ params }: { params: { orderId: string } }) {
  const order = await getOrderDetails(params.orderId);
  if (!order) return <p className="px-3 text-center">No order found</p>;
  const orderSummary = summariseOrder(order?.products);
  return (
    <div className="px-3 mt-5 flex flex-col items-start gap-4">
      <p className="font-bold border-b-2 border-emerald-800">
        Order No: {order?._id}
      </p>
      <Image
        src={`/images/order_placed.svg`}
        alt="Order placed successfully svg"
        height={200}
        width={200}
        className="mx-auto"
        priority
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderSummary?.map((product) => (
            <TableRow key={product.item._id}>
              <TableCell>{product.item.title}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>INR {product.price}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold">
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>INR {order?.amount / 100}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>Status: {order.status.toLocaleUpperCase()}</p>
    </div>
  );
}

export default OrderDetails;
