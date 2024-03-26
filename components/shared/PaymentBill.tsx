"use client";
import IndividualBasketDrawerItem from "./IndividualBasketDrawerItem";
import { IProduct } from "@/types";
import { useCounterStore } from "./Item-store-provider";
import Image from "next/image";

function groupItems(items: IProduct[]) {
  const response: { product: IProduct; quantity: number }[] = [];
  items.forEach((item) => {
    const index = response.findIndex((i) => i.product._id === item._id);
    if (index === -1) {
      response.push({ product: item, quantity: 1 });
    } else {
      response[index].quantity += 1;
    }
  });
  return response;
}
function PaymentBill() {
  const { items } = useCounterStore((store) => store);

  return (
    <div className="my-5">
      <p className="font-semibold">
        <span className="border-emerald-800 border-b-2">Items</span> in your
        cart:
      </p>
      {items.length !== 0 ? (
        <div>
          {groupItems(items).map(
            (item: { product: IProduct; quantity: number }, index) => (
              <IndividualBasketDrawerItem
                item={item.product}
                quantity={item.quantity}
                key={item.product._id}
              />
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 my-4">
          <p className="italic text-emerald-800">
            Sorry, but the cart is empty!
          </p>
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fempty-cart.jpg?alt=media&token=2fb4b28b-df52-4e9f-88f3-63cf4cbdbad6`}
            alt="Cart is empty"
            height={200}
            width={200}
          />
        </div>
      )}
    </div>
  );
}

export default PaymentBill;
