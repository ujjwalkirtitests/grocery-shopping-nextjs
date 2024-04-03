import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IOrder, OrderStatus } from "@/types";
import OrderTabs from "@/components/shared/OrderTabContent";

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
      <OrderTabs orders={pendingOrders || []} />
    </Tabs>
  );
}

export default AdminDashboardTab;
