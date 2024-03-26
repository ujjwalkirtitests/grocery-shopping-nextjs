import { PlusIcon } from "lucide-react";
import React from "react";

function CustomiseGroceryList() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-emerald-800 to-emerald-500 text-white p-1 sm:p-3 rounded-[20px] sm:rounded-[30px] h-[120px] my-6 w-full sm:w-11/12 lg:w-[500px] mx-auto">
      <div className="flex items-center justify-between h-full ">
        <p className="font-bold text-2xl ml-4">
          Customise your
          <br /> grocery list as you like
        </p>
        <div className="bg-black flex flex-col items-center gap-4 px-2 py-3 rounded-[20px] cursor-pointer hover:shadow-lg h-full">
          <PlusIcon />
          <p className="text-center">Add List</p>
        </div>
      </div>
    </div>
  );
}

export default CustomiseGroceryList;
