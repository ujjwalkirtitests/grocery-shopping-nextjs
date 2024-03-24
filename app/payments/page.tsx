import BillDetails from "@/components/shared/BillDetails";
import CheckoutDetails from "@/components/shared/CheckoutDetails";
import PaymentBill from "@/components/shared/PaymentBill";
import StoreToDestinationDetails from "@/components/shared/StoreToDestinationDetails";
import { addUser, getCurrentUser } from "@/lib/actions/user";
import { UserRole } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function PaymentsPage() {
  const session = await getServerSession();
  if (!session)
    return redirect((process.env.DOMAIN + "/api/auth/signin") as string);
  let currentUser = await getCurrentUser(session.user?.email as string);
  if (!currentUser) {
    currentUser = await addUser({
      email: session.user?.email!,
      profile_pic: session.user?.image!,
      role: UserRole.CUSTOMER,
      username: session.user?.name!,
    });
  }
  return (
    <div className="h-full px-3">
      {/* store to destination details*/}
      <StoreToDestinationDetails currentUser={currentUser} />

      {/* details of checkout like date, time */}
      <CheckoutDetails />
      {/* items description with quantity and price */}
      <PaymentBill />
      {/* items total, GST, Delivery Charges and Bill Total*/}

      <BillDetails currentUser={currentUser} />
    </div>
  );
}

export default PaymentsPage;
