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

  province: Joi.string()
    .trim()
    .min(2)
    .message('استان کمتر از ۲ حرف پذیرفته نیست')
    .max(20)
    .message('استان بیشتر از ۲۰ حرف پذیرفته نیست')
    .pattern(/^[\u0600-\u06FF\s]{2,20}/)
    .message('زبان تایپ فارسی نیست')
    .required()
    .messages({ 'any.required': 'فیلد استان وجود ندارد' }),

  city: Joi.string()
    .trim()
    .min(2)
    .message('شهر کمتر از ۲ حرف پذیرفته نیست')
    .max(20)
    .message('شهر بیشتر از ۲۰ حرف پذیرفته نیست')
    .pattern(/^[\u0600-\u06FF\s]{2,20}/)
    .message('زبان تایپ فارسی نیست'),

  address: Joi.string()
    .trim()
    .min(5)
    .message('آدرس کمتر از ۵ حرف پذیرفته نیست')
    .max(100)
    .message('آدرس بیشتر از ۱۰۰ حرف پذیرفته نیست')
    .pattern(/^([\u0600-\u06FF\s0-9]+ ?-? ?)+$/)
    .message('فرمت ارسالی آدرس پدیرفته نیست'),

  postalCode: Joi.string().trim().length(10).message('کد پستی معتبر نیست'),
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

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  province: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  postalCode: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
