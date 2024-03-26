"use client";
import { MinusIcon, PlusIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useCounterStore } from "./Item-store-provider";
import { IProduct } from "@/types";
import { useToast } from "../ui/use-toast";
type ItemCardProps = {
  product: IProduct;
};
function ItemCard({ product }: ItemCardProps) {
  const { addToCart, removeFromCart, totalItemsInCartBasedOnId } =
    useCounterStore((state) => state);

  const [count, setCount] = useState<number>(
    totalItemsInCartBasedOnId(product._id || "")
  );

  const { toast } = useToast();
  return (
    <div className="relative flex flex-col items-center gap-3 mb-2 bg-white shadow-md p-2 md:p-4 rounded-lg hover:transform-gpu hover:scale-x-100 md:hover:scale-x-110 hover:scale-y-105 duration-150 overflow-hidden">
      {product.discountedPrice && (
        <div className="absolute z-20 p-2 -rotate-45 top-4 -left-7 w-[130px] text-center text-emerald-800 font-semibold bg-emerald-50">
          Super Sale
        </div>
      )}
      {product.stock-count < 1 && (
        <div className="h-full w-full absolute top-0 left-0 z-10 flex items-center justify-center bg-emerald-100 bg-opacity-40">
          <p className="font-bold text-xl text-center">
            Sorry,
            <br /> but out of stock!
          </p>
        </div>
      )}
      <div className="relative w-full">
        <Image
          height={200}
          width={200}
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 rounded-lg mr-4 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white text-black rounded-lg px-2 h-[35px] flex items-center justify-center gap-1 z-10">
          <PlusIcon
            tabIndex={2}
            className={
              product.stock - count < 1
                ? "cursor-not-allowed"
                : " cursor-pointer"
            }
            onClick={() => {
              if (product.stock - count < 1) {
                toast({
                  variant: "destructive",
                  title: "Sorry, out of stock",
                });
              } else {
                addToCart(product);
                setCount(count + 1);
              }
            }}
          />
          {count > 0 && (
            <p className="font-semibold bg-emerald-600 p-2 text-white">
              {count}
            </p>
          )}
          {count > 0 && (
            <MinusIcon
              tabIndex={2}
              className=" cursor-pointer"
              onClick={() => {
                removeFromCart(product._id || "");
                setCount(count - 1);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between h-full w-full gap-2">
        <p className="font-bold">{product.title}</p>
        {product.stock - count >= 20 && (
          <p className="text-sm">{product.description}.</p>
        )}
        <div className="flex flex-col  justify-between text-sm gap-2">
          <div className="flex items-center gap-[2px] text-gray-500">
            <p>Rs </p>
            <p className={` ${product.discountedPrice ? "line-through" : ""} `}>
              {product.price.toFixed(2)}
            </p>
            <p className="text-emerald-800 font-semibold">
              {product.discountedPrice?.toFixed(2)}
            </p>
            <p className="">per {product.unit}</p>
          </div>
          {product.stock - count < 20 && product.stock - count > 0 && (
            <div className="text-sm animate-pulse bg-emerald-100 w-full p-2 font-semibold">
              <p>Hurry up, only {product.stock - count} remaining</p>
            </div>
          )}

          <div className="flex items-center gap-1">
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
