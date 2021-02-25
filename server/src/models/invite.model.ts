import { Schema, Document, Model, model } from "mongoose";
import { INVITE_EXPIRY } from "../config/constants";

export interface IInvite extends Document {
  creator: string;
  createdAt?: Date;
}

const InviteSchema: Schema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: new Date(),
    expires: INVITE_EXPIRY,
  },
});

export const Invite: Model<IInvite> = model<IInvite>("Invite", InviteSchema);
