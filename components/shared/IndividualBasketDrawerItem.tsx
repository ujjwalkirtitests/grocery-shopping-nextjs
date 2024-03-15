import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useCounterStore } from "./Item-store-provider";
interface IndividualBasketDrawerItemProps {
  item: Product;
  quantity: number;
}
function IndividualBasketDrawerItem({
  item,
  quantity,
}: IndividualBasketDrawerItemProps) {
  const { addToCart, removeFromCart } = useCounterStore((state) => state);
  const buttonStyle =
    "border border-emerald-600 bg-transparent text-emerald-600 hover:text-white p-1 h-8 hover:bg-emerald-600";
  return (
    <div className="border rounded-md m-2 p-2 flex items-start gap-3 h-40">
      <Image
        src={`/images/${item.thumbnail}`}
        alt={`${item.title}'s image`}
        width={100}
        height={80}
        className="h-36 w-36 rounded-md"
      />
      <div className="flex flex-col h-full justify-between gap-2 p-3 flex-1">
        <div>
          <p className="text-xl">{item.title}</p>
          <p className="text-sm text-gray-500 italic">under {item.category}</p>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 text-md">
            <Button
              onClick={() => {
                addToCart(item);
              }}
              className={buttonStyle}
            >
              <PlusIcon />
            </Button>
            <p>{quantity}</p>
            <Button
              onClick={() => removeFromCart(item.id)}
              className={buttonStyle}
            >
              <MinusIcon />
            </Button>
          </div>
          <div className="font-bold">
            {" "}
            Total: Rs {Math.round(item.price * quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualBasketDrawerItem;
