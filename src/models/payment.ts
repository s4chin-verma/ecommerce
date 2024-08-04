import { Document, Schema, model } from 'mongoose';

export interface IPayment extends Document {
  userID: Schema.Types.ObjectId;
  orderID: Schema.Types.ObjectId;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderID: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Payment = model<IPayment>('Payment', paymentSchema);
