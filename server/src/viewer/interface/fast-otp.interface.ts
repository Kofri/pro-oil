import { Document } from "mongoose";

export interface IFastOtpBodyDTO {
  mobile: string;
}

export interface IFastOtpModel extends Document {
  readonly mobile: string;
  readonly otp: string;
  readonly expires: number;
}
