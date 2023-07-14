import * as Joi from 'joi';

export const signInSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد ارقام تلفن صحیح نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل تلفن صحیح نیست')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),

  otp: Joi.string()
    .trim()
    .length(6)
    .message('تعداد اعداد صحیح نمی باشد')
    .pattern(/^[0-9]{6}$/)
    .message('محتوا ارسالی صحبح نمی باشد')
    .required()
    .messages({ 'any.required': 'فیلد کد احراز هویت وجود ندارد' }),
});
