import mongoose from 'mongoose';
import { Category } from '../Types/types.ts'; // enum כן אפשר לייבא

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  amountOfBuys: Number,
  description: String,
  comments: [String],
  category: { type: String, enum: Object.values(Category) },
  color: String,
  imageUrl: String,
  amountInStock: Number,
  views: Number
});

export default mongoose.model('Product', productSchema);

