import { Document, Schema, model } from "mongoose";

export interface IShipping extends Document {
  orderID: Schema.Types.ObjectId;
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: Date;
  createdAt: Date;
  updatedAt: Date;
}

const shippingSchema: Schema = new Schema({
  orderID: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  trackingNumber: { type: String, required: true },
  carrier: { type: String, required: true },
  status: { type: String, default: "pending" },
  estimatedDelivery: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Shipping = model<IShipping>("Shipping", shippingSchema);
