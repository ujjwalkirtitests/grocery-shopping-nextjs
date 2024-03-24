import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrdersForUser } from "@/lib/actions/order";
import { addUser, getCurrentUser } from "@/lib/actions/user";
import { IOrder, UserData, UserRole } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function OrdersPage() {
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

  let allOrders: IOrder[] | null = [];
  if (currentUser) {
    allOrders = await getOrdersForUser(currentUser._id as string);
  }
  return (
    <div className="px-3 mt-5">
      <p>All Orders</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrders?.map((order, index) => (
            <TableRow key={order._id}>
              <TableCell>
                <Link className="hover:underline" href={`orders/${order._id}`}>
                  Order #{index}
                </Link>
              </TableCell>
              <TableCell>{order.status.toLocaleUpperCase()}</TableCell>
              <TableCell>dsdas</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersPage;
