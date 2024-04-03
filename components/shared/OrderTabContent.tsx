import { IOrder, OrderStatus } from "@/types";
import { TabsContent } from "../ui/tabs";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import OrderStatusCombobox from "./OrderStatusCombobox";

function OrderTabContent({ orders }: { orders: IOrder[] }) {
  return (
    <div>
      <TabsContent value={OrderStatus.PENDING}>
        {orders.length !== 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No.</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>Order #{index}</TableCell>
                  <TableCell>{(order.amount / 100).toFixed(2)}</TableCell>
                  <TableCell>{order.user.username}</TableCell>
                  <TableCell>
                    <OrderStatusCombobox />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center my-4">
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2F404.svg?alt=media&token=aebc2482-1b24-4c65-9bc5-1048c78e07cd`}
              alt="404 Not found svg"
              width={200}
              height={200}
            />
          </div>
        )}
      </TabsContent>
      <TabsContent value={OrderStatus.COMPLETED}>completed</TabsContent>
      <TabsContent value={OrderStatus.CANCELLED}>cancelled</TabsContent>
    </div>
  );
}

export default OrderTabContent;
