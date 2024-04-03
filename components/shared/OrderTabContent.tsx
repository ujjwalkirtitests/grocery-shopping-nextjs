import { IOrder, OrderStatus } from "@/types";
import { TabsContent } from "../ui/tabs";
import Image from "next/image";
import { getOrdersByStatus } from "@/lib/actions/order";
import TabContentTable from "./TabContentTable";

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
	let cancelledOrders = await getOrdersByStatus(OrderStatus.CANCELLED, 0);

	return (
		<div>
			<TabsContent value={OrderStatus.PENDING}>
				{orders.length !== 0 ? (
					<TabContentTable orders={orders} />
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
				{completedOrders.orders.length !== 0 ? (
					<TabContentTable orders={completedOrders.orders} />
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
				{cancelledOrders.orders.length !== 0 ? (
					<TabContentTable orders={cancelledOrders.orders} />
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
