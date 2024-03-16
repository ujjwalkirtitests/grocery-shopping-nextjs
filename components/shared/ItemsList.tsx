import React from "react";
import ItemCard from "./ItemCard";

function ItemsList() {
  return (
    <div>
      <p className="font-bold text-xl mb-2">Items</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groceryProducts.map((product) => (
          <ItemCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ItemsList;

const groceryProducts: Product[] = [
  {
    title: "Apple",
    price: 1.99,
    thumbnail: "apple.jpg",
    id: "101",
    timestamp: 1678923456,
    stock: 50,
    description: "Fresh and juicy apples",
    code: "APL123",
    category: "Fruits",
    status: true,
    rating: 5,
  },
  {
    title: "Carrots",
    price: 0.79,
    thumbnail: "carrot.jpg",
    id: "102",
    timestamp: 1678923457,
    stock: 30,
    description: "Crunchy orange carrots",
    code: "CRT456",
    category: "Vegetables",
    status: true,
    rating: 5,
  },
  {
    title: "Canned Tomato Soup",
    price: 2.49,
    thumbnail: "soup.jpg",
    id: "103",
    timestamp: 1678923458,
    stock: 20,
    description: "Classic tomato soup in a can",
    code: "TMS789",
    category: "Canned Goods",
    status: true,
    rating: 5,
  },
  {
    title: "Cheddar Cheese",
    price: 3.99,
    thumbnail: "cheese.jpg",
    id: "104",
    timestamp: 1678923459,
    stock: 40,
    description: "Sharp and creamy cheddar cheese",
    code: "CHD567",
    category: "Dairy",
    status: true,
    rating: 5,
  },
  {
    title: "Swiss Cheese",
    price: 4.29,
    thumbnail: "swisss.jpg",
    id: "107",
    timestamp: 1678923462,
    stock: 35,
    description: "Nutty and flavorful Swiss cheese",
    code: "SWC678",
    category: "Deli",
    status: true,
    rating: 5,
  },
  {
    title: "Olive Oil",
    price: 7.99,
    thumbnail: "olive-oil.jpg",
    id: "108",
    timestamp: 1678923463,
    stock: 50,
    description: "Extra virgin olive oil",
    code: "OLV345",
    category: "Condiments & Spices",
    status: true,
    rating: 5,
  },
  {
    title: "Potato Chips",
    price: 2.19,
    thumbnail: "chips.jpg",
    id: "109",
    timestamp: 1678923464,
    stock: 60,
    description: "Crunchy and salty potato chips",
    code: "CHP012",
    category: "Snacks",
    status: true,
    rating: 5,
  },
  {
    title: "Whole Wheat Bread",
    price: 3.49,
    thumbnail: "bread.jpg",
    id: "110",
    timestamp: 1678923465,
    stock: 40,
    description: "Nutritious whole wheat bread loaf",
    code: "BRD789",
    category: "Bread & Bakery",
    status: true,
    rating: 5,
  },
  // Add more products here...
];
