"use client";

import { AlignLeftIcon, BellIcon, SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

function Navbar() {
  const iconStyle = "h-[40px] w-[40px] p-2 bg-white rounded-full cursor-pointer hover:shadow-lg";
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between px-3 py-2 h-[70px]">
      <div className="flex items-center gap-4">
        <AlignLeftIcon className={iconStyle} />
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
