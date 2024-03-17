import { IProduct } from "@/types";
import { connectToDatabase } from "../mongodb";
import { Product } from "../models/product";



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

export { addProduct, getTopProducts };
