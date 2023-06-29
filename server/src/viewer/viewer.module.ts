import { Module } from '@nestjs/common';
import { ViewerController } from './viewer.controller';
import { ViewerService } from './viewer.service';
import { DatabaseModule } from 'src/database/database.module';
import { otpProvider, signupProvider, signupTokenProvider } from './provider/viewer.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [ViewerController],
  providers: [ViewerService, ...otpProvider, ...signupProvider, ...signupTokenProvider]
})
export class ViewerModule {}
