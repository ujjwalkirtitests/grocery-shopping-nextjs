import { UserData, UserRole } from "@/types";
import mongoose, { models } from "mongoose";





const UserSchema = new mongoose.Schema<UserData>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    profile_pic: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
}, { timestamps: true });

const User = models.User || mongoose.model<UserData>('User', UserSchema);


export { UserSchema, User }
