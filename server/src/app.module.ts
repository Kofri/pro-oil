import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ViewerModule } from './viewer/viewer.module';
import { TransferModule } from './transfer/transfer.module';
import { TokenModule } from './token/token.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { BloggerModule } from './blogger/blogger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/.${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
    }),
    AdminModule,
    BloggerModule,
    MemberModule,
    ProductModule,
    TokenModule,
    TransferModule,
    UserModule,
    ViewerModule,
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    process.env.NODE_ENV !== 'prod' &&
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
