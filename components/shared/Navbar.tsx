"use client";

import { AlignLeftIcon, BellIcon, SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SideNavbar from "./SideNavbar";

function Navbar() {
  const iconStyle =
    "h-[40px] w-[40px] p-2 bg-white rounded-full cursor-pointer hover:shadow-lg";
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between px-3 py-2 h-[70px]">
      <div className="flex items-center gap-4">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <AlignLeftIcon className={iconStyle} />
            </SheetTrigger>
            <SideNavbar />
          </Sheet>
        </div>
        <div>
          <p className="font-bold">Hello, {session?.user?.name}</p>
          <p className="text-sm">Store Name</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <SearchIcon className={iconStyle} />
        <BellIcon className={iconStyle} />
      </div>
    </div>
  );
}

export default Navbar;
