import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: Schema.Types.ObjectId[];
  phone: string;
  orderHistory: Schema.Types.ObjectId[];
  wishlist: Schema.Types.ObjectId[];
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  phone: { type: String, required: true },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Wishlist" }],
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", userSchema);
