import { UserRole } from "@/types";
import mongoose from "mongoose";





const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    profile_pic: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);


export { UserSchema, User }
