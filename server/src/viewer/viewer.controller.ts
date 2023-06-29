import {
  Controller,
  UsePipes,
  Body,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ViewerService } from './viewer.service';
import { JoiValidationPipe } from './pipe/viewer.pipe';
import { signUpSchema } from './schema/sign-up.schema';
import { SignUpBody } from './DTO/sign-up.dto';
import { ViewerGuard } from './guard/viewer.guard';
import { OtpBody } from './DTO/otp.dto';
import { otpSchema } from './schema/otp.schema';
import { IOtpReturn } from './interface/return.interface';

@ApiTags('viewer')
@Controller('viewer')
export class ViewerController {
  constructor(private viewerService: ViewerService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(ViewerGuard)
  @UsePipes(new JoiValidationPipe(signUpSchema))
  signUp(@Body() signUpBody: SignUpBody) {
    return this.viewerService.signUp(signUpBody);
  }

  @Post('otp')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(ViewerGuard)
  @UsePipes(new JoiValidationPipe(otpSchema))
  async otp(@Body() otpBody: OtpBody): Promise<IOtpReturn>{
    return await this.viewerService.otp(otpBody);
  }
}
