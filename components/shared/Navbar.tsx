"use client";

import {
  AlignLeftIcon,
  BellIcon,
  SearchIcon,
  ShoppingBasketIcon,
  ShoppingCart,
  ShoppingCartIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SideNavbar from "./SideNavbar";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCounterStore } from "./Item-store-provider";
import Image from "next/image";

function Navbar() {
  const iconStyle =
    "h-[40px] w-[40px] p-2 bg-white rounded-full cursor-pointer hover:shadow-lg";
  const { data: session } = useSession();

  const { items } = useCounterStore((state) => state);
  return (
    <div className=" px-3 py-2 h-[70px]">
      <div className="flex items-center justify-between w-full lg:w-4/5 lg:mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <AlignLeftIcon className={iconStyle} />
              </SheetTrigger>
              <SideNavbar />
            </Sheet>
          </div>
          <p className="text-2xl font-bold  mr-4 hidden lg:flex">
            Instant-Order
          </p>

          <div className="flex flex-col lg:hidden">
            <p className="font-bold">Hello, {session?.user?.name}</p>
            <p className="text-sm">Store Name</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SearchIcon className={iconStyle} />
          <BellIcon className={iconStyle} />
          <div className="relative mr-4">
            <ShoppingBasketIcon className={iconStyle} />
            <p className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full h-7 w-7 p-1 flex items-center justify-center text-sm font-semibold">
              {items.length}
            </p>
          </div>
          {session?.user ? (
            <div className="hidden lg:flex lg:items-center gap-4">
              <Link
                href={"/orders"}
                className=" hover:border-b-2 hover:border-emerald-600"
              >
                Past Orders
              </Link>
              <Link href={"/profile"}>
                <Image
                  src={session.user.image || ""}
                  alt={`${session.user.name}'s profile picture`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Sign-out!
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                signIn("google");
              }}
            >
              Log-in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
