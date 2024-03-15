import React from "react";
import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useCounterStore } from "./Item-store-provider";
import IndividualBasketDrawerItem from "./IndividualBasketDrawerItem";
import { WalletIcon } from "lucide-react";

function groupItems(items: Product[]) {
  const response: { product: Product; quantity: number }[] = [];
  items.forEach((item) => {
    const index = response.findIndex((i) => i.product.id === item.id);
    if (index === -1) {
      response.push({ product: item, quantity: 1 });
    } else {
      response[index].quantity += 1;
    }
  });
  return response;
}

function BasketDrawer() {
  const { items } = useCounterStore((store) => store);

  return (
    <DrawerContent className="">
      <div className="h-[70vh] overflow-y-scroll hide-scrollbar relative pb-20">
        {groupItems(items).map(
          (item: { product: Product; quantity: number }, index) => (
            <IndividualBasketDrawerItem
              item={item.product}
              quantity={item.quantity}
              key={item.product.id}
            />
          )
        )}
        <div className="fixed bottom-6 w-3/5 mx-auto left-0 right-0 bg-gradient-to-r from-emerald-600 via-emerald-800 to-emerald-500 text-white flex items-center px-3 py-4 rounded-full justify-center gap-4 text-xl font-semibold cursor-pointer hover:shadow-lg hover:shadow-emerald-700 transform-gpu duration-300">
          Proceed to Payment <WalletIcon />
        </div>
      </div>
    </DrawerContent>
  );
}

export default BasketDrawer;
