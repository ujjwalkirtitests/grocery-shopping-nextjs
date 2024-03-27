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


async function seedProduct(categories: ICategory[]) {
    try {

        await connectToDatabase()
        let modifiedProductArray: any[] = []
        products.map((product: IProduct) => modifiedProductArray.push(({ ...product, category: categories[categories?.findIndex(category => category.name === product.category.name)]._id })))
        console.log(modifiedProductArray)
        await Product.insertMany(modifiedProductArray);
    } catch (err) {
        console.log(err)
    }
}

export { seedCategory, seedProduct }




const products: IProduct[] = [
    {
        title: 'Apple',
        price: 120.00,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fapple.jpg?alt=media&token=23de4198-eefe-4290-9012-736d52dcf87e',
        stock: 100,
        description: 'Fresh and juicy apples',
        code: 'FRU123',
        category: { name: 'Fruits', description: 'Fresh fruits' },
        status: true,
        rating: 4.5
    },
    {
        title: 'Banana',
        price: 40.00,
        unit: 'dozen',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fbanana.jpg?alt=media&token=e2d3aa1a-751d-4c7a-8529-a6111b6f1815',
        stock: 80,
        description: 'Sweet and ripe bananas',
        code: 'FRU124',
        category: { name: 'Fruits', description: 'Fresh fruits' },
        status: true,
        rating: 4.3
    },
    {
        title: 'Orange',
        price: 104.50,
        unit: 'dozen',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Forange.jpg?alt=media&token=75e5d52b-8bdb-4968-b794-0f04e0d7e4cb',
        stock: 75,
        description: 'Sweet and tangy oranges',
        code: 'FRU125',
        category: { name: 'Fruits', description: 'Fresh fruits' },
        status: true,
        rating: 4.2
    },
    {
        title: 'Milk',
        price: 189.00,
        unit: 'litre',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fmilk.jpg?alt=media&token=1e957cc4-78c4-42ae-9d75-ebbeb21b80f7',
        stock: 50,
        description: 'Fresh whole milk',
        code: 'DAI123',
        category: { name: 'Dairy', description: 'Fresh dairy products' },
        status: true,
        rating: 4.6
    },
    {
        title: 'Eggs',
        price: 124.50,
        unit: 'dozen',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Feggs.jpg?alt=media&token=386e7ccc-6a3b-426d-ad13-cc26f7746381',
        stock: 100,
        description: 'Fresh farm eggs',
        code: 'DAI124',
        category: { name: 'Dairy', description: 'Fresh dairy products' },
        status: true,
        rating: 4.7
    },
    {
        title: 'Cheese',
        price: 210.00,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fcheese.jpg?alt=media&token=c89af0f1-3e5d-450d-83ef-7855f427fe0f',
        stock: 60,
        description: 'Delicious cheddar cheese',
        code: 'DAI125',
        category: { name: 'Dairy', description: 'Fresh dairy products' },
        status: true,
        rating: 4.8
    },
    {
        title: 'Bread',
        price: 142.00,
        unit: 'loaf',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fbread.jpg?alt=media&token=2fc8eb12-f59a-4e8f-a533-cec2d725055b',
        stock: 80,
        description: 'Freshly baked bread',
        code: 'BAK123',
        category: { name: 'Bread & Bakery', description: 'Fresh bakery products' },
        status: true,
        rating: 4.5
    },
    {
        title: 'Cake',
        price: 899.00,
        unit: 'piece',
        discountedPrice: 599,
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fcake.jpg?alt=media&token=72b22ca3-fff2-4e9e-b372-78aa715fee3d',
        stock: 20,
        description: 'Delicious chocolate cake',
        code: 'BAK124',
        category: { name: 'Bread & Bakery', description: 'Fresh bakery products' },
        status: true,
        rating: 4.9
    },
    {
        title: 'Cookies',
        price: 210.00,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fcookies.jpg?alt=media&token=a22b9ba0-b844-487d-9868-c38186eeff62',
        stock: 90,
        description: 'Crunchy chocolate chip cookies',
        code: 'BAK125',
        category: { name: 'Bread & Bakery', description: 'Fresh bakery products' },
        status: true,
        rating: 4.8
    },
    {
        title: 'Chicken',
        price: 559.60,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fchicken.jpeg?alt=media&token=f62c6451-144b-41e1-97a7-aeee0fcd867e',
        stock: 50,
        description: 'Fresh chicken meat',
        code: 'MEA123',
        category: { name: 'Meat', description: 'Fresh meat products' },
        status: true,
        rating: 4.6
    },
    {
        title: 'Pork',
        price: 611.40,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fpork.jpg?alt=media&token=762694ea-8388-4bfc-ad50-30adb2c76fed',
        stock: 45,
        description: 'Fresh pork meat',
        code: 'MEA125',
        category: { name: 'Meat', description: 'Fresh meat products' },
        status: true,
        rating: 4.6
    },
    {
        title: 'Fish',
        price: 839.40,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Ffish.jpg?alt=media&token=333ea7fb-e9da-483c-b690-5103fae0027f',
        stock: 30,
        description: 'Fresh fish',
        code: 'SEA123',
        category: { name: 'Fish & Seafood', description: 'Fresh seafood products' },
        status: true,
        rating: 4.5
    },
    {
        title: 'Shrimp',
        price: 1049.40,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fshrimp.jpg?alt=media&token=5c55ca45-6456-4dad-817d-cb96bfcb9f5d',
        stock: 25,
        description: 'Fresh shrimp',
        code: 'SEA124',
        category: { name: 'Fish & Seafood', description: 'Fresh seafood products' },
        status: true,
        rating: 4.7
    },
    {
        title: 'Lobster',
        price: 1499.40,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Flobster.jpg?alt=media&token=518b22f6-aec0-4ef0-affb-354cbe26f220',
        stock: 15,
        description: 'Fresh lobster',
        code: 'SEA125',
        category: { name: 'Fish & Seafood', description: 'Fresh seafood products' },
        status: true,
        rating: 4.9
    },
    {
        title: 'Tomato',
        price: 104.50,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Ftomato.jpg?alt=media&token=3afd7271-129f-4e5f-8791-e3eb444d50a1',
        stock: 100,
        description: 'Fresh and ripe tomatoes',
        code: 'VEG123',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.4
    },
    {
        title: 'Potato',
        price: 69.30,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fpotato.jpg?alt=media&token=b2d69e55-ccab-4d02-bcc5-8433d31dc62e',
        stock: 100,
        description: 'Fresh potatoes',
        code: 'VEG124',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.3
    },
    {
        title: 'Carrot',
        price: 104.50,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fcarrot.jpg?alt=media&token=7d1fe3a0-d94e-4ec0-9369-2ec03816cb51',
        stock: 80,
        description: 'Fresh and crunchy carrots',
        code: 'VEG125',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.4
    },
    {
        title: 'Onion',
        price: 69.30,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fonion.jpeg?alt=media&token=3dbf0524-5b49-49ef-b6e3-4a35caa6549c',
        stock: 90,
        description: 'Fresh onions',
        code: 'VEG126',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.2
    },
    {
        title: 'Garlic',
        price: 69.30,
        unit: 'kg',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-homespa.appspot.com/o/images%2Fgarlic.jpg?alt=media&token=4fadb61e-5a91-4339-a8fc-33e05d02e1ca',
        stock: 100,
        description: 'Fresh garlic',
        code: 'VEG127',
        category: { name: 'Vegetables', description: 'Fresh vegetables' },
        status: true,
        rating: 4.3
    }
];
