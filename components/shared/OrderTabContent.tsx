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
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "@/lib/actions/order";

async function OrderTabs({ orders }: { orders: IOrder[] }) {
	// const [completedOrders, setCompletedOrders] = useState<IOrder[]>([]);
	// const [cancelledOrders, setCancelledOrders] = useState<IOrder[]>([]);
	// useEffect(() => {
	// 	async function fetchRemainingOrders(): Promise<void> {
	// 		const localCompleteOrders = await getOrdersByStatus(
	// 			OrderStatus.COMPLETED,
	// 			0
	// 		);
	// 		if (localCompleteOrders) {
	// 			setCompletedOrders(localCompleteOrders.orders);
	// 		}

	// 		const localCancelledOrders = await getOrdersByStatus(
	// 			OrderStatus.CANCELLED,
	// 			0
	// 		);
	// 		if (localCancelledOrders) {
	// 			setCancelledOrders(localCancelledOrders.orders);
	// 		}
	// 	}
	// 	fetchRemainingOrders();
	// }, []);

	let completedOrders = await getOrdersByStatus(OrderStatus.COMPLETED, 0);
	if (!completedOrders) {
		completedOrders.orders = [];
	}

	return (
		<div>
			<TabsContent value={OrderStatus.PENDING}>
				{orders.length !== 0 ? (
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
							{orders.map((order, index) => (
								<TableRow key={order._id}>
									<TableCell>Order #{index}</TableCell>
									<TableCell>
										{(order.amount / 100).toFixed(2)}
									</TableCell>
									<TableCell>{order.user.username}</TableCell>
									<TableCell>
										<OrderStatusCombobox
											orderId={order._id}
										/>
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
			<TabsContent value={OrderStatus.COMPLETED}>
				{completedOrders.length !== 0 ? (
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
							{completedOrders.map((order, index) => (
								<TableRow key={order._id}>
									<TableCell>Order #{index}</TableCell>
									<TableCell>
										{(order.amount / 100).toFixed(2)}
									</TableCell>
									<TableCell>{order.user.username}</TableCell>
									<TableCell>
										<OrderStatusCombobox
											orderId={order._id}
										/>
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
			<TabsContent value={OrderStatus.CANCELLED}>
				{cancelledOrders.length !== 0 ? (
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
							{cancelledOrders.map((order, index) => (
								<TableRow key={order._id}>
									<TableCell>Order #{index}</TableCell>
									<TableCell>
										{(order.amount / 100).toFixed(2)}
									</TableCell>
									<TableCell>{order.user.username}</TableCell>
									<TableCell>
										<OrderStatusCombobox
											orderId={order._id}
										/>
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
		</div>
	);
}

export default OrderTabs;
