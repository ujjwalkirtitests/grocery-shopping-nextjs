import ItemCard from "./ItemCard";
import { IProduct } from "@/types";
import Image from "next/image";

interface ItemsListProps {
  groceryProducts: IProduct[];
}

function ItemsList({ groceryProducts }: ItemsListProps) {
  return (
    <div>
      <p className="font-bold text-xl mb-2">Items</p>
      {groceryProducts.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {groceryProducts.map((product) => (
            <ItemCard product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={`/images/404.svg`}
            alt="404 Not found svg"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}

export default ItemsList;
