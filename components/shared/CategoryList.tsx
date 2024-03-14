"use client";
import React, { useState } from "react";
const groceryCategories = [
  "All",
  "Fruits",
  "Vegetables",
  "Canned Goods",
  "Dairy",
  "Meat",
  "Fish & Seafood",
  "Deli",
  "Condiments & Spices",
  "Snacks",
  "Bread & Bakery",
  "Beverages",
  "Pasta, Rice & Cereal",
  "Baking",
  "Frozen Foods",
  "Personal Care",
  "Health Care",
  "Household & Cleaning Supplies",
  "Baby Items",
  "Pet Care",
];

function styleBasedOnCurrentCategory(
  currentCategory: string,
  category: string
) {
  if (currentCategory === category) {
    return "text-white bg-emerald-600";
  } else {
    return " bg-white";
  }
}

function CategoryList() {
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  return (
    <div className="mb-4">
      <p className="font-bold text-xl mb-2">Category</p>
      <div className="w-full flex items-center gap-2 overflow-x-scroll hide-scrollbar">
        {groceryCategories.map((category, index) => (
          <p
            onClick={() => setCurrentCategory(category)}
            className={`font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap cursor-pointer hover:shadow-md my-2
                ${styleBasedOnCurrentCategory(currentCategory, category)}
            `}
            key={index}
          >
            {category}
          </p>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
