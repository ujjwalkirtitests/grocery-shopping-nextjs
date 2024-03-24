"use client";
import { IProduct, UserData } from "@/types";
import { useCounterStore } from "./Item-store-provider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomisedButton from "./CustomisedButton";
import { clientSidePaymentHandler } from "@/lib/razorpay";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function totalCost(items: IProduct[]) {
  return Number(items.reduce((acc, item) => acc + item.price, 0).toFixed(2));
}

interface BillDetailsProps {
  currentUser: UserData | null;
}
function BillDetails({ currentUser }: BillDetailsProps) {
  const { items } = useCounterStore((state) => state);
  const router = useRouter();
  const { toast } = useToast();
  return (
    <div className="border-t-2 border-b-2 border-emerald-800 flex flex-col items-center p-2">
      <Table>
        {/* <TableCaption>Bill Details</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total Cost</TableCell>
            <TableCell className="text-right">INR {totalCost(items)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CustomisedButton
        onClick={async (e) => {
          if (currentUser) {
            await clientSidePaymentHandler(currentUser, items, toast, router);
            e.preventDefault();
          } else {
            toast({
              title: "Please login to continue",
            });
          }
        }}
        className="mt-5"
      >
        Pay Now!
      </CustomisedButton>
    </div>
  );
}

export default BillDetails;
