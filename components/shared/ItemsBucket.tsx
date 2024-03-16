"use client";
import { ShoppingBasketIcon } from "lucide-react";
import React from "react";
import { useCounterStore } from "./Item-store-provider";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BasketDrawer from "./BasketDrawer";
function ItemsBucket() {
  const { items } = useCounterStore((state) => state);
  return (
    <div className="fixed bottom-4 right-2 z-20 bg-emerald-500 text-white p-2 h-16 w-16 rounded-full cursor-pointer flex lg:hidden">
      <Drawer>
        <DrawerTrigger className="h-full w-full flex items-center justify-center">
          <ShoppingBasketIcon className="h-10 w-10" />
          <p className="absolute -top-1 right-0 bg-red-600 rounded-full flex items-center justify-center h-8 w-8 font-semibold">
            {items.length}
          </p>
        </DrawerTrigger>
        <BasketDrawer/>
      </Drawer>
    </div>
  );
}

export default ItemsBucket;
