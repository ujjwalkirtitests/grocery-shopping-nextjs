import { toast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/lib/actions/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function AdminDashboardPage() {
  const session = await getServerSession();
  if (session?.user) {
    const currentUser = await getCurrentUser(session.user.email as string);
    if (currentUser?.role !== "seller") {
      return redirect(process.env.DOMAIN + "/profile");
    }
  }
  if (!session) {
    return redirect(process.env.DOMAIN + "/api/auth/signin");
  }
  return <div>AdminDashboardPage</div>;
}

export default AdminDashboardPage;
