import { FilterQuery } from "mongoose";
import { User } from "../models/user";
import { connectToDatabase } from "../mongodb";
import { UserData } from "@/types";

async function getCurrentUser(email: string): Promise<UserData | null> {
    try {
        await connectToDatabase()
        const currentUser = await User.findOne({ email: email })

        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

}

async function addUser(user: UserData): Promise<UserData | null> {
    const newUser = new User(user);
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        console.error(err);
        return null;
    }
}


async function updateUser(email: string, updates: Partial<UserData>): Promise<UserData | null> {
    try {
        await connectToDatabase()
        const user = await User.findOneAndUpdate({ email: email } as FilterQuery<UserData>, updates, { new: true }).exec();
        if (user) {
            console.log('User updated:', user);
            return user;
        } else {
            console.log('No user found with email:', email);
            return null
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function deleteUserById(userId: string): Promise<UserData | null> {
    try {
        await connectToDatabase();
        const user = await User.findByIdAndDelete(userId).exec();
        if (user) {
            console.log('User deleted:', user);
        } else {
            console.log('No user found with ID:', userId);
        }
        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
}


export { getCurrentUser, updateUser, deleteUserById, addUser }
