import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useCounterStore } from "./Item-store-provider";
import IndividualBasketDrawerItem from "./IndividualBasketDrawerItem";
import { WalletIcon } from "lucide-react";
import { IProduct, UserData } from "@/types";
import Script from "next/script";
import Link from "next/link";
import CustomisedButton from "./CustomisedButton";
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
interface BasketDrawerProps {
  currentUser: UserData | null;
}
function BasketDrawer({ currentUser }: BasketDrawerProps) {
  const { items } = useCounterStore((store) => store);

  return (
    <DrawerContent className="">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="h-[70vh] overflow-y-scroll hide-scrollbar relative pb-20">
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
          <div className="flex flex-col items-center justify-center pt-5">
            <Image
              src={`/images/empty-cart.jpg`}
              alt="Picture of empty shopping cart"
              height={300}
              width={300}
              className="my-10"
            />
            <p className="text-xl font-semibold">Sorry, the cart is empty!</p>
          </div>
        )}

        {items.length !== 0 && (
          <CustomisedButton
            asChild={true}
            className="fixed bottom-6 w-11/12 sm:w-3/5 mx-auto left-0 right-0 flex items-center px-3 py-6 rounded-full justify-center gap-4 text-xl font-semibold"
          >
            <Link href={"/payments"}>
              Proceed to Payment <WalletIcon />
            </Link>
          </CustomisedButton>
        )}
      </div>
    </DrawerContent>
  );
}

export default BasketDrawer;
