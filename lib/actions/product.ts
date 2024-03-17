import { IProduct } from "@/types";
import { connectToDatabase } from "../mongodb";
import { Product } from "../models/product";
import { ObjectId } from "mongodb";



async function addProduct(product: IProduct): Promise<IProduct | null> {
    const newProduct = new Product(product);
    try {

        await connectToDatabase()
        const savedProduct = await newProduct.save();
        return JSON.parse(JSON.stringify(savedProduct));

    } catch (error) {
        console.error(error);
        return null;
    }

}

async function getTopProducts(): Promise<IProduct[] | null> {
    try {
        await connectToDatabase()
        const products = await Product.find().sort({ rating: 'desc' }).limit(15);
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function getProductsBasedOnCategory(categoryId: string): Promise<IProduct[] | null> {
    if (!categoryId) throw new Error('Category id is required');
    const currentCategoryId = new ObjectId(categoryId);
    try {
        await connectToDatabase()
        const products = await Product.find({ category: currentCategoryId });
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error(error);
        return null;
    }


}

async function findProducts(searchTerm: string): Promise<IProduct[] | null> {

    try {
        await connectToDatabase();
        const products = await Product.find({
            $text: {
                $search: searchTerm,
                $caseSensitive: false,
                // Set the language to "none" to disable diacritic sensitivity. Default is "en" (English)
            }
        }).exec();
        return JSON.parse(JSON.stringify(products));

    } catch (error) {
        console.error(error);
        return null;
    }
}

export { addProduct, getTopProducts, findProducts, getProductsBasedOnCategory };
