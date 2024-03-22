"use client";
import { MinusIcon, PlusIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useCounterStore } from "./Item-store-provider";
import { IProduct } from "@/types";
type ItemCardProps = {
  product: IProduct;
};
function ItemCard({ product }: ItemCardProps) {
  const { items, addToCart, removeFromCart, totalItemsInCartBasedOnId } =
    useCounterStore((state) => state);

  const [count, setCount] = useState<number>(
    totalItemsInCartBasedOnId(product._id || "")
  );

  return (
    <div className="flex flex-col items-center gap-3 mb-2 bg-white shadow-md p-2 md:p-4 rounded-lg hover:transform-gpu hover:scale-x-100 md:hover:scale-x-110 hover:scale-y-105 duration-150">
      <div className="relative w-full">
        <Image
          height={200}
          width={200}
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 rounded-lg mr-4 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white text-black rounded-lg px-2 h-[35px] flex items-center justify-center gap-1 cursor-pointer">
          <PlusIcon
            onClick={() => {
              addToCart(product);
              setCount(count + 1);
            }}
          />
          {count > 0 && (
            <p className="font-semibold bg-emerald-600 p-2 text-white">
              {count}
            </p>
          )}
          {count > 0 && (
            <MinusIcon
              onClick={() => {
                removeFromCart(product._id || "");
                setCount(count - 1);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <p className="font-bold">{product.title}</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 font-semibold">${product.price}</p>
          <div className="flex items-center gap-2">
            <StarIcon className="text-yellow-400 " />
            <p className="font-bold">
              {parseFloat(product.rating.toString() + ".0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
