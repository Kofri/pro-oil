import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { HydratedDocument } from 'mongoose';

export const otpSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),
  nationalCode: Joi.string()
    .trim()
    .length(10)
    .message('تعداد ارقام  کدملی صحبح نیست')
    .pattern(/^[0-9]{10}$/)
    .message('کد ملی صحبح نیست')
    .required()
    .messages({ 'any.required': 'فیلد کد ملی وجود ندارد' }),
  birthDate: Joi.string()
    .trim()
    .length(10)
    .message('')
    .pattern(
      /^1(3|4)[0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-2]\/(0[1-9]|[1-2][0-9]|30)))$/,
    )
    .message('')
    .required()
    .messages({ 'any.required': 'فیلد زادرود وجود ندارد' }),
});

export type TypeOtpSchema = HydratedDocument<Otp>;

@Schema()
export class Otp {
  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  nationalCode: string;
  
  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  expires: number;

  @Prop({ default: 'Nam-unknown' })
  name: string;

  @Prop({ default: 'Fam-unknown' })
  family: string;

  @Prop({ default: '' })
  province: string;
  
  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  postalCode: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
