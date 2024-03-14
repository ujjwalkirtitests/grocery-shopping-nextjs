import BottomLinearGradient from "@/components/shared/BottomLinearGradient";
import CategoryList from "@/components/shared/CategoryList";
import CustomiseGroceryList from "@/components/shared/CustomiseGroceryList";
import ItemsBucket from "@/components/shared/ItemsBucket";
import ItemsList from "@/components/shared/ItemsList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session?.user) {
    redirect(process.env.DOMAIN + "/api/auth/signin");
  }
  return (
    <main className="px-3">
      <CustomiseGroceryList />
      <CategoryList />
      <ItemsList />
      <ItemsBucket />
      <BottomLinearGradient />
    </main>
  );
}
