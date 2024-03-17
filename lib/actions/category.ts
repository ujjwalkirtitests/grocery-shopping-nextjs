import { ICategory } from "@/types";
import { Category } from "../models/category";
import { connectToDatabase } from "../mongodb";


async function getAllCategories(): Promise<ICategory[] | null> {
    try {
        await connectToDatabase();
        const categories = await Category.find({});
        return JSON.parse(JSON.stringify(categories));
    } catch (err) {
        console.error(err)
        return null
    }
}



export { getAllCategories };
