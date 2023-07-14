import { Module } from '@nestjs/common';
import { ViewerController } from './viewer.controller';
import { ViewerService } from './viewer.service';
import { DatabaseModule } from 'src/database/database.module';
import { fastOtpProvider, otpProvider, signupProvider, refreshTokenProvider } from './provider/viewer.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({global: true}), DatabaseModule],
  controllers: [ViewerController],
  providers: [ViewerService, ...otpProvider, ...signupProvider, ...refreshTokenProvider, ...fastOtpProvider]
})
export class ViewerModule {}
