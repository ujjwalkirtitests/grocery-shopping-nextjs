import BottomLinearGradient from "@/components/shared/BottomLinearGradient";
import CategoryList from "@/components/shared/CategoryList";
import CustomiseGroceryList from "@/components/shared/CustomiseGroceryList";
import ItemsBucket from "@/components/shared/ItemsBucket";
import ItemsList from "@/components/shared/ItemsList";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();



  return (
    <main className="px-3">
      {session?.user && (
        <div className="hidden lg:flex lg:flex-col">
          <p className="font-bold text-3xl">
            Hello, {session?.user?.name?.split(" ")[0]} 👋
          </p>
          <p className="text-sm">Store Name</p>
        </div>
      )}
      <div className="flex items-center  lg:bg-white mb-2">
        <CustomiseGroceryList />
        <div className="w-1/3">
          <Image
            src={"/images/shopping_Cart.jpg"}
            alt="Shopping cart jpeg"
            width={200}
            height={200}
            className=""
          />
        </div>
      </div>
      <CategoryList />
      <ItemsList />
      <ItemsBucket />
      <BottomLinearGradient />
    </main>
  );
}
