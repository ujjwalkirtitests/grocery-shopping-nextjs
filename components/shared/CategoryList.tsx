"use client";
import { ICategory } from "@/types";
import React, { useState } from "react";

function styleBasedOnCurrentCategory(
  currentCategory: string | undefined,
  category: string
) {
  if (currentCategory === category) {
    return "text-white bg-emerald-600";
  } else {
    return " bg-white";
  }
}
interface CategoryListProps {
  groceryCatergories: ICategory[];
}

function CategoryList({ groceryCatergories }: CategoryListProps) {
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    groceryCatergories.length === 0 ? null : groceryCatergories[0]
  );
  return (
    <div className="mb-4">
      <p className="font-bold text-xl mb-2">Category</p>
      {groceryCatergories.length !== 0 && currentCategory ? (
        <div className="w-full flex items-center gap-2 overflow-x-scroll hide-scrollbar">
          {groceryCatergories.map((category, index) => (
            <p
              onClick={() => setCurrentCategory(category)}
              className={`font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap cursor-pointer hover:shadow-md my-2
                ${styleBasedOnCurrentCategory(
                  currentCategory?.name,
                  category.name
                )}
            `}
              key={index}
            >
              {category.name}
            </p>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center">Sorry, there are no categories!!</p>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
