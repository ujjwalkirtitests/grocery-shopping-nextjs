'use client'
import IndividualBasketDrawerItem from "./IndividualBasketDrawerItem";
import { IProduct } from "@/types";
import { useCounterStore } from "./Item-store-provider";




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
  );
}

export default PaymentBill;
