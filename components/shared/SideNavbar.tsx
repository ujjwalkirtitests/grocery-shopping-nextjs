import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomisedButton from "./CustomisedButton";
function SideNavbar() {
  const { data: session } = useSession();
  const linkStyle = "hover:underline pl-2";
  return (
    <SheetContent side={"left"} className="flex flex-col items-start">
      {session?.user ? (
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 border-b pb-3 mt-10">
          <Image
            className="rounded-full border-4 border-emerald-600"
            src={session.user.image || ""}
            alt={`${session.user.name}'s profile picture`}
            width={100}
            height={100}
          />
          <div className="">
            <p className="font-semibold">
              Hey, {session.user.name?.split(" ")[0]}
            </p>
            <p className="text-sm text-gray-600">{session.user.email}</p>
          </div>
          <Link className={linkStyle} href={"/"}>
            Home
          </Link>
          <Link className={linkStyle} href={"/orders"}>
            Past Orders
          </Link>

          <Link href={"/profile"} className={linkStyle}>
            Profile
          </Link>
          <CustomisedButton
            text="Sign-out"
            onClick={() => {
              signOut();
            }}
          />
        </div>
      ) : (
        <CustomisedButton
          text="Log-in"
          onClick={() => {
            signIn("google");
          }}
        />
      )}
    </SheetContent>
  );
}

export default SideNavbar;
