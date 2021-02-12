import { Schema, Document, Model, model, ObjectId } from "mongoose";

export interface IWishlist extends Document {
  name: string;
  owner: ObjectId;
  items: [ObjectId];
  sharedUsers: [ObjectId];
  createDate: Date;
  modifyDate: Date;
}

const WishlistSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  sharedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createDate: { type: Date, required: true, default: new Date() },
  modifyDate: { type: Date, required: true, default: new Date() },
});

export const Wishlist: Model<IWishlist> = model<IWishlist>("Wishlist", WishlistSchema);
