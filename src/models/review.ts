import { Document, Schema, model } from 'mongoose';

export interface IReview extends Document {
  productID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema = new Schema({
  productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Review = model<IReview>('Review', reviewSchema);
