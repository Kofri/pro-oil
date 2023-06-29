import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { HydratedDocument } from 'mongoose';

export const otpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required(),
});

export type TypeOtpSchema = HydratedDocument<Otp>;

@Schema()
export class Otp {
  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  expires: number;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
