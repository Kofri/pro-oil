import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { HydratedDocument } from 'mongoose';

export const signUpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required(),
  nationalCode: Joi.string()
    .length(10)
    .message('تعداد ارقام صحبح نیست')
    .pattern(/^[0-9]{10}$/)
    .message('کد ملی صحبح نیست'),
  car: Joi.string()
    .min(3)
    .message('فرمت ارسالی صحیح نمی باشد')
    .max(30)
    .message('فرمت ارسالی صحیح نمی باشد'),
  tag: Joi.string()
    .length(9)
    .message('محتوا پلاک کامل نیست')
    .pattern(/^[0-9]{2}[\u0600-\u06FF]{1}[0-9]{3}-[0-9]{2}$/)
    .message('فرمت پلاک صحبح نیست'),
  name: Joi.string().min(3).max(43),
  gmail: Joi.string()
    .pattern(/^[a-zA-Z0-9_.+-]+@(gmail|yahoo).*\.[a-zA-Z]{2,6}$/)
    .message('فرمت جیمیل اشتباه است'),
  password: Joi.string()
    .min(5)
    .message('تعداد حروف باید بیشتر از 5 باشد')
    .max(35)
    .message('تعداد حروف باید کمتر از 35 باشد')
    .pattern(/^([a-z]|[A-Z])(\w|#|&|%|@|\$)*$/)
    .message('فرمت رمز عبور اشتباه است'),
  otp: Joi.string()
    .length(6)
    .message('تعداد اعداد صحیح نمی باشد')
    .pattern(/^[0-9]{6}$/)
    .message('محتوا ارسالی صحبح نمی باشد'),
});

export type TypeSignUpSchema = HydratedDocument<SignUp>;

@Schema()
export class SignUp {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  nationalCode: string;

  @Prop({ required: true })
  car: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  gmail: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  otp: string;
}

export const SignUpSchema = SchemaFactory.createForClass(SignUp);
