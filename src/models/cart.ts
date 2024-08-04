import { Document, Schema, model } from 'mongoose';

export interface ICart extends Document {
  userID: Schema.Types.ObjectId;
  products: Array<{ product: Schema.Types.ObjectId, quantity: number }>;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, required: true } }],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Cart = model<ICart>('Cart', cartSchema);
