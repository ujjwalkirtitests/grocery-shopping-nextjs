import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useCounterStore } from "./Item-store-provider";
import IndividualBasketDrawerItem from "./IndividualBasketDrawerItem";
import { WalletIcon } from "lucide-react";
import { IProduct, UserData } from "@/types";
import { Button } from "../ui/button";
import { paymentHandler } from "@/lib/razorpay";
import Script from "next/script";

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
interface BasketDrawerProps {
  currentUser: UserData | null;
}
function BasketDrawer({ currentUser }: BasketDrawerProps) {
  const { items } = useCounterStore((store) => store);

  return (
    <DrawerContent className="">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />;
      <div className="h-[70vh] overflow-y-scroll hide-scrollbar relative pb-20">
        {groupItems(items).map(
          (item: { product: IProduct; quantity: number }, index) => (
            <IndividualBasketDrawerItem
              item={item.product}
              quantity={item.quantity}
              key={item.product._id}
            />
          )
        )}
        <Button
          onClick={async (e) => {
            if (currentUser) {
              const amount =
                items.reduce(function (total, currentItem: IProduct) {
                  total += currentItem.price;
                  return total;
                }, 0) * 100;
              const order = {
                amount: amount,
                currency: "INR",
                receipt: "receipt#1",
              };
              const response = await fetch("/api/payment/create-order", {
                method: "POST",
                body: JSON.stringify(order),
              });
              const createdOrder = await response.json();
              if (createdOrder.error) {
                alert("something went wrong, please try again");
                return;
              }
              paymentHandler(amount, createdOrder.id, items, currentUser);
              e.preventDefault();
            } else {
              alert("Please login to continue");
            }
          }}
          className="fixed bottom-6 w-3/5 mx-auto left-0 right-0 bg-gradient-to-r from-emerald-600 via-emerald-800 to-emerald-500 text-white flex items-center px-3 py-4 rounded-full justify-center gap-4 text-xl font-semibold cursor-pointer hover:shadow-lg hover:shadow-emerald-700 transform-gpu duration-300"
        >
          Proceed to Payment <WalletIcon />
        </Button>
      </div>
    </DrawerContent>
  );
}

export default BasketDrawer;
