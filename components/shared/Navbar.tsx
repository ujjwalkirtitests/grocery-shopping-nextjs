"use client";

import {
  AlignLeftIcon,
  BellIcon,
  HourglassIcon,
  SearchIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SideNavbar from "./SideNavbar";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCounterStore } from "./Item-store-provider";
import Image from "next/image";
import { Input } from "../ui/input";
import { IProduct } from "@/types";
import ItemCard from "./ItemCard";
import CustomisedButton from "./CustomisedButton";

function Navbar() {
  const iconStyle =
    "h-[40px] w-[40px] p-2 bg-white rounded-full cursor-pointer hover:shadow-lg";
  const { data: session } = useSession();

  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | null>(
    []
  );

  const [loading, setLoading] = useState<boolean>(false);

  const { items } = useCounterStore((state) => state);
  return (
    <div className=" px-3 py-2 h-auto">
      <div className="flex items-center justify-between w-full lg:w-4/5 lg:mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex lg:hidden">
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

          {session?.user && (
            <div className="flex flex-col lg:hidden">
              <p className="font-bold">Hello, {session?.user?.name}</p>
              <p className="text-sm">Store Name</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <SearchIcon
            className={iconStyle}
            onClick={() => setShowSearchBox(!showSearchBox)}
          />
          {session?.user && <BellIcon className={iconStyle} />}
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
      {showSearchBox && (
        <div className="w-full lg:w-3/5 lg:mx-auto py-2 lg:px-4 mt-2">
          <div className=" rounded-lg flex items-center gap-4 bg-white border transform-gpu duration-200 transition-opacity animate-in py-2 px-4">
            <Input
              type="text"
              className="border-none active:outline-none outline-none"
              placeholder="Search..."
              onChange={async (e) => {
                if (e.target.value.length > 2) {
                  setLoading(true);
                  const response = await fetch(
                    `/api/products/${e.target.value}`
                  );

                  const products = await response.json();

                  setFilteredProducts(products);
                  setLoading(false);
                }
              }}
            />
            <SearchIcon />
          </div>
          {loading && (
            <div className="w-full flex justify-center items-center mt-5">
              <HourglassIcon />
            </div>
          )}
          {!loading && filteredProducts?.length === 0 && (
            <p className="font-semibold text-center w-full mt-4">
              Sorry, but no product was found!
            </p>
          )}

          {filteredProducts?.length !== 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-3 px-2">
              {filteredProducts?.map((product) => (
                <ItemCard product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
