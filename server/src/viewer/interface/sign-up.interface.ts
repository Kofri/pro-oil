import { Document } from "mongoose";

export interface ISignUpBodyDTO {
  mobile: string;
  car: string;
  tag: string;
  gmail: string;
  password: string;
  otp: string;
  province?: string;
}

export interface ISignUpModel extends Document {
  readonly mobile: string;
  readonly nationalCode: string;
  readonly car: string;
  readonly tag: string;
  readonly name: string;
  readonly family: string;
  readonly gmail: string;
  readonly password: string;
  readonly cash: string;
  readonly bills: Array<string>;
  readonly discountCode: Array<string>;
  readonly recentTransactions: Array<Object>;
  readonly province: string;
  readonly city: string;
  readonly birthData: string;
  readonly Address: string;
  readonly postalCode: string;
  readonly serial: string;
  readonly role: Array<string>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}