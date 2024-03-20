import { addUser, getCurrentUser } from "@/lib/actions/user";
import { UserData, UserRole } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

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
  return <div>OrdersPage</div>;
}

export default OrdersPage;
