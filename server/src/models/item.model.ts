import { Schema, Document, Model, model } from "mongoose";

interface PriceDate {
  price: number;
  date: Date;
}

export interface IItem extends Document {
  title: string;
  url: string;
  imageURL: string;
  currentPrice: number;
  priceHistory: PriceDate[];
  createDate: Date;
  modifyDate: Date;
  valid: boolean;
  count: number;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true, index: true },
  imageURL: { type: String },
  currentPrice: { type: Number, required: true },
  priceHistory: [{ price: Number, date: Date }],
  createDate: { type: Date, required: true, default: new Date() },
  modifyDate: { type: Date, required: true, default: new Date() },
  valid: { type: Boolean, required: true, default: true },
  count: { type: Number, required: true, default: 1 },
});

export const Item: Model<IItem> = model<IItem>("Item", ItemSchema);
