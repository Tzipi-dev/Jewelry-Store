export interface Product {
    name: string;
    price: number;
    rating: number;
    amountOfBuys: number;
    description: string;
    comments: Array<string>;
    category: Category;
    color: string;
    imageUrl: string;
    amountInStock: number;
    views: number;
}
export interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}
export interface Cart {
    dateOfBuy: Date;
    owner: User;
    products: Array<Product>;
}
export enum Category {
    Earrings = "עגילים",
    Bracelets = "צמידים",
    Watches = "שעונים",
    Necklaces = "שרשראות",
    Rings = "טבעות"
}