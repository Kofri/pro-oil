import { Document } from "mongoose";

export interface ISignUpBodyDTO {
  mobile: string;
  otp: string;
  car: string;
  tag: string;
  gmail: string;
  password: string;
  name: string;
  family: string;
}

export interface ISignUpModelDTO {
  mobile: string;
  nationalCode: string;
  car: string;
  tag: string;
  name: string;
  family: string;
  gmail: string;
  password: string;
  cash: string;
  bills: Array<string>;
  discountCode: Array<string>;
  recentTransactions: Array<Object>;
  province: string;
  city: string;
  birthData: string;
  Address: string;
  postalCode: string;
  serial: string;
  role: Array<string>;
  createdAt: Date;
  updatedAt: Date;
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