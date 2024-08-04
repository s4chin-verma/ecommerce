import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  images: string[];
  stock: number;
  reviews: Schema.Types.ObjectId[];
  ratings?: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  images: [String],
  stock: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  ratings: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = model<IProduct>("Product", productSchema);

// const ProductModel =
//   (mongoose.models.Product as mongoose.Model<Product>) ||
//   mongoose.model<Product>("Product", productSchema);

// export default ProductModel;
