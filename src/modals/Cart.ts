import mongoose, { Schema, Document } from "mongoose";
import { Cart as ICart } from '../Types/types';
import User from "./User";
import Product from "./Product";

interface CartDoc extends ICart, Document {}

const CartSchema: Schema<CartDoc> = new Schema({
  dateOfBuy: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model<CartDoc>("Cart", CartSchema);
