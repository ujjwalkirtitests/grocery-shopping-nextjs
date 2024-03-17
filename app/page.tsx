import BottomLinearGradient from "@/components/shared/BottomLinearGradient";
import CategoryList from "@/components/shared/CategoryList";
import CustomiseGroceryList from "@/components/shared/CustomiseGroceryList";
import ItemsBucket from "@/components/shared/ItemsBucket";
import ItemsList from "@/components/shared/ItemsList";
import { getAllCategories } from "@/lib/actions/category";
import { getTopProducts } from "@/lib/actions/product";
import { seedCategory, seedProduct } from "@/lib/seed";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();

  let categories = await getAllCategories();

  if (categories?.length === 0) {
    await seedCategory();
    categories = await getAllCategories();
  }

  let products = await getTopProducts();

  if (products?.length === 0) {
    await seedProduct();
    products = await getTopProducts();
  }

  return (
    <main className="px-3">
      {session?.user && (
        <div className="hidden lg:flex lg:flex-col">
          <p className="font-bold text-3xl">
            Hello, {session?.user?.name?.split(" ")[0]} 👋
          </p>
          <p className="text-sm mb-5">Store Name</p>
        </div>
      )}
      <div className="flex items-center  lg:bg-white mb-2">
        <CustomiseGroceryList />
        <div className="w-1/3 hidden lg:flex">
          <Image
            src={"/images/shopping_Cart.jpg"}
            alt="Shopping cart jpeg"
            width={200}
            height={200}
            className=""
          />
        </div>
      </div>
      <CategoryList groceryCatergories={categories || []} />
      <ItemsList groceryProducts={products || []} />
      <ItemsBucket />
      <BottomLinearGradient />
    </main>
  );
}
