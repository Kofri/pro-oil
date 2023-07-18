import { Mongoose } from 'mongoose';
import { SignUpSchema } from '../schema/sign-up.schema';
import { OtpSchema } from '../schema/otp.schema';
import { RefreshTokenSchema } from 'src/token/schema/refresh-token.schema';
import { FastOtpSchema } from '../schema/fast-otp.schema';

export const signupProvider = [
  {
    provide: 'SIGNUP_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Signup', SignUpSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const otpProvider = [
  {
    provide: 'OTP_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('otp', OtpSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const fastOtpProvider = [
  {
    provide: 'FAST_OTP_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('fast-otp', FastOtpSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const refreshTokenProvider = [
  {
    provide: 'REFRESH_TOKEN_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('refresh-token', RefreshTokenSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
