import { Mongoose } from 'mongoose';
import { RefreshTokenSchema } from 'src/token/schema/refresh-token.schema';

export const refreshTokenProvider = [
  {
    provide: 'REFRESH_TOKEN_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('refresh-token', RefreshTokenSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
