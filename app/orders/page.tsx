import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

async function OrdersPage() {
  const session = await getServerSession();
  if (!session || !session?.user) {
    redirect(process.env.DOMAIN + "/api/auth/signin");
  }
  return (
    <div>OrdersPage</div>
  )
}

export default OrdersPage
