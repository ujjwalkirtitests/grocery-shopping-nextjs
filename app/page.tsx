import BottomLinearGradient from "@/components/shared/BottomLinearGradient";
import CategoryList from "@/components/shared/CategoryList";
import CustomiseGroceryList from "@/components/shared/CustomiseGroceryList";
import ItemsBucket from "@/components/shared/ItemsBucket";
import ItemsList from "@/components/shared/ItemsList";
import { getAllCategories } from "@/lib/actions/category";
import { getTopProducts } from "@/lib/actions/product";
import { getCurrentUser } from "@/lib/actions/user";
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

  const currentUser = await getCurrentUser(session?.user?.email as string);

  return (
    <main className="px-3">
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
      <ItemsBucket currentUser={currentUser} />
      <BottomLinearGradient />
    </main>
  );
}
