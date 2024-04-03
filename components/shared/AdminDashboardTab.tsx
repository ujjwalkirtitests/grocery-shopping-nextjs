import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderTabContent from "@/components/shared/OrderTabContent";
import { IOrder, OrderStatus } from "@/types";

function AdminDashboardTab({
  pendingOrders,
}: {
  pendingOrders: IOrder[] | undefined;
}) {
  return (
    <Tabs defaultValue={OrderStatus.PENDING} className="w-full">
      <TabsList className="border w-full">
        <TabsTrigger className="w-full" value={OrderStatus.PENDING}>
          Pending
        </TabsTrigger>
        <TabsTrigger className="w-full" value={OrderStatus.COMPLETED}>
          Completed
        </TabsTrigger>
        <TabsTrigger className="w-full" value={OrderStatus.CANCELLED}>
          Cancelled
        </TabsTrigger>
      </TabsList>
      <OrderTabContent orders={pendingOrders || []} />
    </Tabs>
  );
}

export default AdminDashboardTab;
