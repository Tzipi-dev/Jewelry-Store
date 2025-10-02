import mongoose, { Schema, Document } from "mongoose";
import type { Cart } from '../Types/types';


interface CartDoc extends Cart, Document {}

const CartSchema: Schema<CartDoc> = new Schema({
  dateOfBuy: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model<CartDoc>("Cart", CartSchema);
