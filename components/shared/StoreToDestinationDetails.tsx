"use client";
import { UserData } from "@/types";
import { HomeIcon, MapPinIcon } from "lucide-react";
import { getAddress } from "@/lib/utils";
import CustomisedButton from "./CustomisedButton";
import { Textarea } from "../ui/textarea";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
interface StoreToDestinationDetailsProps {
  currentUser: UserData | null;
}

function Dot() {
  return <div className="bg-black h-1 w-1 rounded-full"></div>;
}
function StoreToDestinationDetails({
  currentUser,
}: StoreToDestinationDetailsProps) {
  const [address, setAddress] = useState<string>("");

  const { toast } = useToast();
  return (
    <div>
      <div className="flex items-center gap-3">
        <MapPinIcon />
        <p>Store Address</p>
      </div>
      <div className="flex flex-col gap-2 ml-2 my-2">
        <Dot />
        <Dot />
        <Dot />
      </div>
      <div className="flex items-start gap-3">
        <HomeIcon />
        {currentUser ? (
          currentUser.address ? (
            <div>
              <p>{currentUser.address}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-3 rounded-lg p-2 border border-emerald-500 bg-white">
              <p className="text-lg text-center  sm:text-xl font-semibold">
                Sorry, you don&apos;t have any saved address.
              </p>

              <CustomisedButton onClick={getAddress}>
                Auto-fetch Address
              </CustomisedButton>
              <p>OR</p>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Manually enter address.."
                className="h-[200px] outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <CustomisedButton
                onClick={async () => {
                  const response = await fetch("/api/user/update", {
                    method: "POST",
                    body: JSON.stringify({
                      email: currentUser.email,
                      updates: { address: address },
                    }),
                  });
                  if (response.status !== 200) {
                    toast({
                      variant: "destructive",
                      title: "Something went wrong",
                    });
                    return;
                  }
                }}
              >
                Save Address
              </CustomisedButton>
            </div>
          )
        ) : (
          <CustomisedButton
            onClick={() => {
              signIn("google");
            }}
          >
            Log-in
          </CustomisedButton>
        )}
      </div>
    </div>
  );
}

export default StoreToDestinationDetails;
