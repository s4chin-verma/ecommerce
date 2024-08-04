import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
}

const adminSchema: Schema<IAdmin> = new Schema({
  username: { type: String, required: true },
});

export const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);
