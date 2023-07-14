import { Document, ObjectId } from "mongoose";

export interface IRefreshTokenModel extends Document {
    readonly id: ObjectId;
    readonly refreshToken: string;
  }