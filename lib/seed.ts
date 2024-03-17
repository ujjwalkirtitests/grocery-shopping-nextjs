import { ICategory, IProduct } from "@/types";
import { Category } from "./models/category";
import { connectToDatabase } from "./mongodb";
import { Product } from "./models/product";


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

async function seedCategory() {
    try {
        // add categories
        await connectToDatabase()
        groceryCategories.map(async (categoryName: string) => {
            const categoryObject: ICategory = {
                name: categoryName,
                description: "Some random description.",

            }

            const newCategory = new Category(categoryObject);
            await newCategory.save();


        })





    } catch (err) {
        console.log(err)
    }
}


async function seedProduct() {
    try {

        await connectToDatabase()

        products.map(async (product: IProduct) => {
            const newProduct = new Product(product);
            await newProduct.save();

        }
        )

    } catch (err) {
        console.log(err)

    }
}

export { seedCategory, seedProduct }




const products: IProduct[] = [
    {
        title: 'Apple',
        price: 1.99,
        thumbnail: '/images/apple.jpg',
        stock: 100,
        description: 'Fresh and juicy apples',
        code: 'FRU123',
        category: { name: 'Fruits', description: 'Fresh fruits' },
        status: true,
        rating: 4.5
    },
    {
        title: 'Banana',
        price: 0.99,
        thumbnail: '/images/apple.jpg',
        stock: 80,
        description: 'Sweet and ripe bananas',
        code: 'FRU124',
        category: { name: 'Fruits', description: 'Fresh fruits' },
        status: true,
        rating: 4.3
    },
    {
        title: 'Orange',
        price: 1.49,
        thumbnail: '/images/apple.jpg',
        stock: 75,
        description: 'Sweet and tangy oranges',
        code: 'FRU125',
        category: { name: 'Fruits', description: 'Fresh fruits' },
        status: true,
        rating: 4.2
    },
    {
        title: 'Milk',
        price: 2.99,
        thumbnail: '/images/apple.jpg',
        stock: 50,
        description: 'Fresh whole milk',
        code: 'DAI123',
        category: { name: 'Dairy', description: 'Fresh dairy products' },
        status: true,
        rating: 4.6
    },
    {
        title: 'Eggs',
        price: 2.49,
        thumbnail: '/images/apple.jpg',
        stock: 100,
        description: 'Fresh farm eggs',
        code: 'DAI124',
        category: { name: 'Dairy', description: 'Fresh dairy products' },
        status: true,
        rating: 4.7
    },
    {
        title: 'Cheese',
        price: 3.99,
        thumbnail: '/images/apple.jpg',
        stock: 60,
        description: 'Delicious cheddar cheese',
        code: 'DAI125',
        category: { name: 'Dairy', description: 'Fresh dairy products' },
        status: true,
        rating: 4.8
    },
    {
        title: 'Bread',
        price: 2.99,
        thumbnail: '/images/apple.jpg',
        stock: 80,
        description: 'Freshly baked bread',
        code: 'BAK123',
        category: { name: 'Bread & Bakery', description: 'Fresh bakery products' },
        status: true,
        rating: 4.5
    },
    {
        title: 'Cake',
        price: 14.99,
        thumbnail: '/images/apple.jpg',
        stock: 20,
        description: 'Delicious chocolate cake',
        code: 'BAK124',
        category: { name: 'Bread & Bakery', description: 'Fresh bakery products' },
        status: true,
        rating: 4.9
    },
    {
        title: 'Cookies',
        price: 3.99,
        thumbnail: '/images/apple.jpg',
        stock: 90,
        description: 'Crunchy chocolate chip cookies',
        code: 'BAK125',
        category: { name: 'Bread & Bakery', description: 'Fresh bakery products' },
        status: true,
        rating: 4.8
    },
    {
        title: 'Chicken',
        price: 9.99,
        thumbnail: '/images/apple.jpg',
        stock: 50,
        description: 'Fresh chicken meat',
        code: 'MEA123',
        category: { name: 'Meat', description: 'Fresh meat products' },
        status: true,
        rating: 4.6
    },
    {
        title: 'Beef',
        price: 11.99,
        thumbnail: '/images/apple.jpg',
        stock: 40,
        description: 'Fresh beef meat',
        code: 'MEA124',
        category: { name: 'Meat', description: 'Fresh meat products' },
        status: true,
        rating: 4.7
    },
    {
        title: 'Pork',
        price: 10.99,
        thumbnail: '/images/apple.jpg',
        stock: 45,
        description: 'Fresh pork meat',
        code: 'MEA125',
        category: { name: 'Meat', description: 'Fresh meat products' },
        status: true,
        rating: 4.6
    },
    {
        title: 'Fish',
        price: 12.99,
        thumbnail: '/images/apple.jpg',
        stock: 30,
        description: 'Fresh fish',
        code: 'SEA123',
        category: { name: 'Fish & Seafood', description: 'Fresh seafood products' },
        status: true,
        rating: 4.5
    },
    {
        title: 'Shrimp',
        price: 14.99,
        thumbnail: '/images/apple.jpg',
        stock: 25,
        description: 'Fresh shrimp',
        code: 'SEA124',
        category: { name: 'Fish & Seafood', description: 'Fresh seafood products' },
        status: true,
        rating: 4.7
    },
    {
        title: 'Lobster',
        price: 19.99,
        thumbnail: '/images/apple.jpg',
        stock: 15,
        description: 'Fresh lobster',
        code: 'SEA125',
        category: { name: 'Fish & Seafood', description: 'Fresh seafood products' },
        status: true,
        rating: 4.9
    },
    {
        title: 'Tomato',
        price: 1.49,
        thumbnail: '/images/apple.jpg',
        stock: 100,
        description: 'Fresh and ripe tomatoes',
        code: 'VEG123',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.4
    },
    {
        title: 'Potato',
        price: 0.99,
        thumbnail: '/images/apple.jpg',
        stock: 100,
        description: 'Fresh potatoes',
        code: 'VEG124',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.3
    },
    {
        title: 'Carrot',
        price: 1.49,
        thumbnail: '/images/apple.jpg',
        stock: 80,
        description: 'Fresh and crunchy carrots',
        code: 'VEG125',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.4
    },
    {
        title: 'Onion',
        price: 0.99,
        thumbnail: '/images/apple.jpg',
        stock: 90,
        description: 'Fresh onions',
        code: 'VEG126',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.2
    },
    {
        title: 'Garlic',
        price: 0.99,
        thumbnail: '/images/apple.jpg',
        stock: 100,
        description: 'Fresh garlic',
        code: 'VEG127',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.3
    }
];
