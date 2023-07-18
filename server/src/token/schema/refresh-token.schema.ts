import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { HydratedDocument } from 'mongoose';

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .min(20)
    .pattern(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    .message('فرمت توکن صحیح نیست'),
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد اعداد 11 نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل شماره اشتباه است')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),
});

export type TypeRefreshTokenSchema = HydratedDocument<RefreshToken>;

@Schema()
export class RefreshToken {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  refreshToken: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
