import { Schema, Document, Model, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  createDate?: Date;
  modifyDate?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createDate: { type: Date, required: true, default: new Date() },
  modifyDate: { type: Date, required: true, default: new Date() },
});

export const User: Model<IUser> = model<IUser>("User", UserSchema);
