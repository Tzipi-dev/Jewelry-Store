export interface Product  {
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
export interface User   {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}
export interface Cart   {
    dateOfBuy: Date;
    owner: User;
    products: Array<Product>;
}
export const Category = {
  Earrings: "עגילים",
  Bracelets: "צמידים",
  Watches: "שעונים",
  Necklaces: "שרשראות",
  Rings: "טבעות",
} as const;

export type Category = typeof Category[keyof typeof Category];