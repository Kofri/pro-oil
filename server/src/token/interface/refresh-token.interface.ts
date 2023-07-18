import { Document, ObjectId } from 'mongoose';

export interface IRefreshTokenBodyDTO {
  refreshToken: string;
  mobile: string;
}

export interface IRefreshTokenModel extends Document {
  readonly id: ObjectId;
  readonly refreshToken: string;
}

export interface IRefreshTokenModelDTO {
  id: string;
  refreshToken: string;
}
