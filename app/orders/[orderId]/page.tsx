import CustomisedButton from "@/components/shared/CustomisedButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderDetails } from "@/lib/actions/order";
import { addUser, getCurrentUser } from "@/lib/actions/user";
import { IProduct, UserData, UserRole } from "@/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
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
  const session = await getServerSession();
  if (!session || !session?.user) {
    redirect(process.env.DOMAIN + "/api/auth/signin");
  }

  let currentUser = await getCurrentUser(session.user.email as string);
  if (!currentUser) {
    const userData: UserData = {
      email: session.user.email as string,
      username: session.user.name as string,
      role: UserRole.CUSTOMER,
      profile_pic: session.user.image as string,
    };
    currentUser = await addUser(userData);
  }
  const order = await getOrderDetails(params.orderId);
  if (!order)
    return (
      <div className="flex flex-col items-center gap-4">
        <Image
          src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2F404.svg?alt=media&token=aebc2482-1b24-4c65-9bc5-1048c78e07cd`}
          alt="404 Not found svg"
          width={200}
          height={200}
        />
        <p className="px-3 text-center font-semibold text-2xl">
          No order found
        </p>
        <CustomisedButton asChild>
          <Link href={process.env.DOMAIN + "/orders"}>Go back!</Link>
        </CustomisedButton>
      </div>
    );
  const orderSummary = summariseOrder(order?.products);
  return (
    <div className="px-3 mt-5 flex flex-col items-start gap-4">
      <p className="font-bold border-b-2 border-emerald-800">
        Order No: {order?._id}
      </p>
      <Image
        src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Forder_placed.svg?alt=media&token=d6f2f648-fef5-43f7-a287-6ee4188a7393`}
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
              <TableCell>INR {product.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold">
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>INR {(order?.amount / 100).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>Status: {order.status.toLocaleUpperCase()}</p>
    </div>
  );
}

export default OrderDetails;
