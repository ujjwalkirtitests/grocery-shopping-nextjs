import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    profile_pic: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);


export { UserSchema, User }
