import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import OrderStatusCombobox from "./OrderStatusCombobox";
import { IOrder } from "@/types";
function TabContentTable({ orders }: { orders: IOrder[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="text-emerald-600">
					<TableHead>Order No.</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order: IOrder, index: number) => (
					<TableRow key={order._id}>
						<TableCell>Order #{index}</TableCell>
						<TableCell>{(order.amount / 100).toFixed(2)}</TableCell>
						<TableCell>{order.user.username}</TableCell>
						<TableCell>
							<OrderStatusCombobox orderId={order._id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default TabContentTable;
