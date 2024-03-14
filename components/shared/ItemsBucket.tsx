"use client";
import { ShoppingBasketIcon } from "lucide-react";
import React from "react";
import { useCounterStore } from "./Item-store-provider";

function ItemsBucket() {
  const { items } = useCounterStore((state) => state);
  return (
    <div className="fixed bottom-4 right-2 z-20 bg-emerald-500 text-white p-3 rounded-full cursor-pointer">
      <ShoppingBasketIcon className="h-12 w-12" />
      <p className="absolute -top-1 right-0 bg-red-600 rounded-full flex items-center justify-center h-8 w-8 font-semibold">
        {items.length}
      </p>
    </div>
  );
}

export default ItemsBucket;
