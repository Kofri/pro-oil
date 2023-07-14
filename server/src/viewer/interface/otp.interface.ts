import { Document, ObjectId } from 'mongoose';

export interface IOtpBodyDTO {
  mobile: string;
  nationalCode: string;
  birthDate: string;
  province: string;
  city: string;
  address?: string;
  postalCode?: string;
}

export interface IOtpModelDTO {
  _id: ObjectId;
  mobile: string;
  otp: string;
  expires: number;
  nationalCode: string;
  birthDate: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface IOtpModel extends Document {
  readonly mobile: string;
  readonly otp: string;
  readonly expires: number;
  readonly nationalCode: string;
  readonly birthDate: string;
  readonly province: string;
  readonly city: string;
  readonly address: string;
  readonly postalCode: string;
}
