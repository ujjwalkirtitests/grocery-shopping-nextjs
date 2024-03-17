import React from "react";
import ItemCard from "./ItemCard";
import { IProduct } from "@/types";

interface ItemsListProps {
  groceryProducts: IProduct[];
}

function ItemsList({ groceryProducts }: ItemsListProps) {
  return (
    <div>
      <p className="font-bold text-xl mb-2">Items</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groceryProducts.map((product) => (
          <ItemCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ItemsList;
