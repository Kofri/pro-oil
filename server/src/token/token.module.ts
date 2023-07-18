import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { refreshTokenProvider } from './provider/token.provider';
import { signupProvider } from 'src/viewer/provider/viewer.provider';
import { TokenMiddleware } from './middleware/token.middleware';

@Module({
  imports: [JwtModule.register({ global: true }), DatabaseModule],
  controllers: [TokenController],
  providers: [TokenService, ...refreshTokenProvider, ...signupProvider],
})
export class TokenModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'token/refresh-token', method: RequestMethod.PUT });
  }
}
