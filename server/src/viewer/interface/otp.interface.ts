import { Document } from 'mongoose';

export interface IOtpBody {
  mobile: string;
}

export interface IOtpModel extends Document {
  readonly mobile: string;
  readonly otp: string;
  readonly expires: number;
}
