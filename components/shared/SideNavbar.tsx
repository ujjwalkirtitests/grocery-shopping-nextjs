import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
function SideNavbar() {
  const { data: session } = useSession();
  const linkStyle = "hover:underline pl-2";
  return (
    <SheetContent side={"left"} className="flex flex-col items-start">
      {session?.user && (
        <div className="flex items-center gap-4 border-b pb-3 mt-10">
          <Image
            className="rounded-full"
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
        </div>
      )}
      <Link className={linkStyle} href={"/orders"}>
        Past Orders
      </Link>

      <Link href={"/profile"} className={linkStyle}>
        Profile
      </Link>

      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign-out
      </Button>
    </SheetContent>
  );
}

export default SideNavbar;
