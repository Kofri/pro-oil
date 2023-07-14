import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { ISignUpBodyDTO, ISignUpModel } from '../interface/sign-up.interface';
import {
  IFastOtpBodyDTO,
  IFastOtpModel,
} from '../interface/fast-otp.interface';
import {
  IOtpBodyDTO,
  IOtpModel,
  IOtpModelDTO,
} from '../interface/otp.interface';
import { ISignInBodyDTO } from '../interface/sign-in.interface';

@Injectable()
export class FastOtpGuard implements CanActivate {
  constructor(
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    @Inject('FAST_OTP_MODEL')
    private readonly fastOtpModel: Model<IFastOtpModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const fastOtpBody: IFastOtpBodyDTO = request.body;
    const existMember = await this.signUpModel.findOne({
      mobile: fastOtpBody.mobile,
    });
    if (!existMember) {
      throw new HttpException('کاربری یافت نشد', HttpStatus.NOT_FOUND);
    }
    const existingOtp = await this.fastOtpModel.findOne({
      mobile: fastOtpBody.mobile,
    });
    if (existingOtp) {
      const timestamp = existingOtp.expires - new Date().getTime();
      if (timestamp >= 0) {
        throw new HttpException(
          'درخواست کد زودنر از حد مجاز است',
          HttpStatus.FORBIDDEN,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class OtpGuard implements CanActivate {
  constructor(
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const otpBody: IOtpBodyDTO = request.body;
    const existingOtp = await this.otpModel.findOne({ mobile: otpBody.mobile });
    if (existingOtp) {
      const timestamp = existingOtp.expires - new Date().getTime();
      if (timestamp >= 0) {
        throw new HttpException(
          'درخواست کد زودنر از حد مجاز است',
          HttpStatus.FORBIDDEN,
        );
      }
    }
    const existingUser = await this.signUpModel.findOne({ mobile: otpBody.mobile });
    if(existingUser) {
      throw new HttpException(
        'کاربر قبلاً ثبت نام شده',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return true;
  }
}

@Injectable()
export class SignInGuard implements CanActivate {
  constructor(
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    @Inject('FAST_OTP_MODEL')
    private readonly fastOtpModel: Model<IFastOtpModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const signInBody: ISignInBodyDTO = request.body;
    const viewer = await this.fastOtpModel.findOneAndDelete({
      mobile: signInBody.mobile,
    });
    if (!viewer) {
      throw new HttpException('کاربری یافت نشد', HttpStatus.NOT_FOUND);
    }
    const member = await this.signUpModel.findOne({
      mobile: signInBody.mobile,
    });
    if (!member) {
      throw new HttpException('کاربر ثبت نام نشده', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}

@Injectable()
export class SignUpGuard implements CanActivate {
  constructor(
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const signUpBody: ISignUpBodyDTO = request.body;
    const viewer: IOtpModelDTO = await this.otpModel.findOne({
      mobile: signUpBody.mobile,
    });
    if (!viewer) {
      throw new HttpException('کاربری یافت نشد', HttpStatus.NOT_FOUND);
    }
    const { mobile, gmail, tag } = signUpBody;
    const { nationalCode, otp } = viewer;
    const existMobileUser = await this.signUpModel.findOne({ mobile });
    const existGmailUser = await this.signUpModel.findOne({ gmail });
    const existNationalUser = await this.signUpModel.findOne({ nationalCode });
    const existTagUser = await this.signUpModel.findOne({ tag });
    const timestamp = viewer.expires - new Date().getTime();
    if (otp !== signUpBody.otp) {
      throw new HttpException('کد احراز هویت صحبح نیست', HttpStatus.NOT_FOUND);
    } else if (timestamp <= 0) {
      throw new HttpException(
        'کد احراز هویت منقضی شده است',
        HttpStatus.GATEWAY_TIMEOUT,
      );
    } else if (existMobileUser) {
      throw new HttpException(
        'کاربری با این موبایل وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (existGmailUser) {
      throw new HttpException(
        'کاربری با این جیمیل وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (existNationalUser) {
      throw new HttpException(
        'کاربری با این کد ملی وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (existTagUser) {
      throw new HttpException(
        'کاربری با این پلاک وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
