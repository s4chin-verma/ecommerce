import { Document, Schema, model } from "mongoose";

export interface IOrder extends Document {
  userID: Schema.Types.ObjectId;
  products: Array<{ product: Schema.Types.ObjectId; quantity: number }>;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Order = model<IOrder>("Order", orderSchema);
