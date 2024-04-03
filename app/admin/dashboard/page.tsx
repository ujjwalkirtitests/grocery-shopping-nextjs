import AdminDashboardTab from "@/components/shared/AdminDashboardTab";
import { getOrdersByStatus } from "@/lib/actions/order";
import { getCurrentUser } from "@/lib/actions/user";
import { OrderStatus, UserRole } from "@/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

async function AdminDashboardPage() {
	const session = await getServerSession();
	if (session?.user) {
		const currentUser = await getCurrentUser(session.user.email as string);
		if (currentUser?.role !== UserRole.SELLER) {
			return (
				<div className="flex flex-col items-center gap-4 font-semibold text-3xl p-3 text-center">
					<Image
						src={"/not_allowed.svg"}
						alt="Unauthorized access svg"
						height={400}
						width={400}
					/>
					<p>
						Sorry, but you are not{" "}
						<span className="text-emerald-600 font-semibold">
							authorised
						</span>{" "}
						to access this page!
					</p>
				</div>
			);
		}
	}
	if (!session) {
		return redirect(process.env.DOMAIN + "/api/auth/signin");
	}
	const defaultPendingOrderData = await getOrdersByStatus(
		OrderStatus.PENDING,
		0
	);

	return (
		<div className="px-3">
			<p className="text-2xl font-semibold mt-5 mb-3">Orders</p>
			<AdminDashboardTab
				pendingOrders={defaultPendingOrderData?.orders}
			/>
		</div>
	);
}

export default AdminDashboardPage;
