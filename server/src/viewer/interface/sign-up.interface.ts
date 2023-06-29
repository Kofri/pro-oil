import { Document } from "mongoose";

export interface ISignUpBody {
  mobile: string;
  nationalCode: string;
  car: string;
  tag: string;
  name: string;
  gmail: string;
  password: string;
  otp: string;
}

export interface ISignUpModel extends Document {
  readonly mobile: string;
  readonly nationalCode: string;
  readonly car: string;
  readonly tag: string;
  readonly name: string;
  readonly gmail: string;
  readonly password: string;
  readonly otp: string;
}