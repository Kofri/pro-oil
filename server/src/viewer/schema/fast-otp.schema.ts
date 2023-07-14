import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { HydratedDocument } from 'mongoose';

export const fastOtpSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),
});

export type TypeFastOtpSchema = HydratedDocument<FastOtp>;

@Schema()
export class FastOtp {
  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  expires: number;
}

export const FastOtpSchema = SchemaFactory.createForClass(FastOtp);
