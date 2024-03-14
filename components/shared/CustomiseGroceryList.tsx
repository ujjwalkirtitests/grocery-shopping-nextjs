import { PlusIcon } from "lucide-react";
import React from "react";

function CustomiseGroceryList() {
  return (
    <div className=" bg-gradient-to-r from-emerald-600 via-emerald-800 to-emerald-500 text-white p-3 rounded-[30px] h-[120px] my-6 w-11/12 mx-auto">
      <div className="flex items-center justify-between h-full ">
        <p className="font-bold text-2xl ml-4">
          Customise your
          <br /> grocery list as you like
        </p>
        <div className="bg-black flex flex-col items-center gap-4 px-2 py-3 rounded-[20px] cursor-pointer hover:shadow-lg">
          <PlusIcon />
          <p>Add List</p>
        </div>
      </div>
    </div>
  );
}

export default CustomiseGroceryList;
