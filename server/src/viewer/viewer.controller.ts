import {
  Controller,
  UsePipes,
  Body,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ViewerService } from './viewer.service';
import { JoiValidationPipe, OtpPipes } from './pipe/viewer.pipe';
import { signUpSchema } from './schema/sign-up.schema';
import { SignUpBody } from './DTO/sign-up.dto';
import { OtpBody } from './DTO/otp.dto';
import { otpSchema } from './schema/otp.schema';
import {
  IFastOtpReturnDTO,
  IOtpReturnDTO,
  ISignInReturnDTO,
  ISignUpReturnDTO,
} from './interface/return.interface';
import { fastOtpSchema } from './schema/fast-otp.schema';
import { FastOtpBody } from './DTO/fast-otp.dto';
import { SignInBody } from './DTO/sign-in.dto';
import { signInSchema } from './schema/sign-in.schema';
import {
  FastOtpGuard,
  OtpGuard,
  SignInGuard,
  SignUpGuard,
} from './guard/viewer.guard';

@ApiTags('viewer')
@Controller('viewer')
export class ViewerController {
  constructor(private viewerService: ViewerService) {}
  @Post('fast-otp')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(FastOtpGuard)
  @UsePipes(new JoiValidationPipe(fastOtpSchema))
  fastOtp(@Body() fastOtpBody: FastOtpBody): Promise<IFastOtpReturnDTO> {
    return this.viewerService.fastOtp(fastOtpBody);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(SignInGuard)
  @UsePipes(new JoiValidationPipe(signInSchema))
  signIn(@Body() signInBody: SignInBody): Promise<ISignInReturnDTO> {
    return this.viewerService.signIn(signInBody);
  }
  
  @Post('otp')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(OtpGuard)
  @UsePipes(new JoiValidationPipe(otpSchema))
  @UsePipes(new OtpPipes())
  async otp(@Body() otpBody: OtpBody): Promise<IOtpReturnDTO> {
    return await this.viewerService.otp(otpBody);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SignUpGuard)
  @UsePipes(new JoiValidationPipe(signUpSchema))
  signUp(@Body() signUpBody: SignUpBody): Promise<ISignUpReturnDTO> {
    return this.viewerService.signUp(signUpBody);
  }
}
