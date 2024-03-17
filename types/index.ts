export interface IProduct {
    title: string,
    price: number,
    discountedPrice?: number,
    thumbnail: string,
    _id?: string,
    stock: number,
    description: string,
    code: string,
    category: ICategory,
    status: boolean,
    rating: number
    createdAt?: Date,
    updatedAt?: Date,
}

export enum UserRole {
    CUSTOMER = 'customer',
    SELLER = 'seller',
}

export interface UserData {
    username: string,
    email: string,
    _id?: string,
    role: UserRole,
    profile_pic: string
    address?: string,
    phone?: string,
    createdAt?: Date,
    updatedAt?: Date,
}


export interface IOrder {
    _id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    products: IProduct[],
    user: UserData,
    status: string
}


export interface IPayment {
    _id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    amount: number,
    user: UserData,
    status: string,
    order: IOrder,
    payment_method: string,
    currency: string,
}


export interface ICategory {
    _id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    name: string,
    description: string,
    thumbnail?: string
}

