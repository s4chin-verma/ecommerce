import { Document, Schema, model } from 'mongoose';

export interface IWishlist extends Document {
  userID: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema: Schema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Wishlist = model<IWishlist>('Wishlist', wishlistSchema);
