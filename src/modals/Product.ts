import mongoose, { Schema, Document } from "mongoose";
import { Product as IProduct, Category } from '../Types/types';

interface ProductDoc extends IProduct, Document {}

const ProductSchema: Schema<ProductDoc> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  amountOfBuys: { type: Number, default: 0 },
  description: { type: String, required: true },
  comments: { type: [String], default: [] },
  category: { type: String, enum: Object.values(Category), required: true },
  color: { type: String },
  imageUrl: { type: String },
  amountInStock: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

export default mongoose.model<ProductDoc>("Product", ProductSchema);
