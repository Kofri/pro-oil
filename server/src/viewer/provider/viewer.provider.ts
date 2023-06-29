import { Mongoose } from 'mongoose';
import { SignUpSchema } from '../schema/sign-up.schema';
import { OtpSchema } from '../schema/otp.schema';
import { RefreshTokenSchema } from '../schema/refresh-token.schema';

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

export const signupTokenProvider = [
  {
    provide: 'REFRESH_TOKEN_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('refresh-token', RefreshTokenSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
