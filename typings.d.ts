interface Product {
    title: string,
    price: number,
    discountedPrice?: number,
    thumbnail: string,
    _id: string,
    stock: number,
    description: string,
    code: string,
    category: Category,
    status: boolean,
    rating: number
    createdAt?: Date,
    updatedAt?: Date,
}


interface User {
    username: string,
    password: string,
    email: string,
    _id: string,
    role: string,
    profile_pic: string
    address?: string,
    phone?: string,
    createdAt?: Date,
    updatedAt?: Date,
}


interface Order {
    _id: string,
    createdAt?: Date,
    updatedAt?: Date,
    products: Product[],
    user: User,
    status: string
}


interface Payment {
    _id: string,
    createdAt?: Date,
    updatedAt?: Date,
    amount: number,
    user: User,
    status: string,
    order: Order,
    payment_method: string,
    currency: string,
}


interface Category {
    _id: string,
    createdAt?: Date,
    updatedAt?: Date,
    name: string,
    description: string,
}
