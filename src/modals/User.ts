import mongoose, { Schema, Document } from "mongoose";
import { User as IUser } from '../Types/types';

interface UserDoc extends IUser, Document {}

const UserSchema: Schema<UserDoc> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
});

export default mongoose.model<UserDoc>("User", UserSchema);
