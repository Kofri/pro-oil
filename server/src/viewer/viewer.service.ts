import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ISignUpBody, ISignUpModel } from './interface/sign-up.interface';
import { hashPass } from 'src/utils/hashing';
import { Model } from 'mongoose';
import { IOtpBody, IOtpModel } from './interface/otp.interface';
import { createOtp, expiresMin, sendOtp } from 'src/utils/sms';
import {
  ISimpleReturn,
} from 'src/common/interface/returns.interface';
import { log } from 'console';
import { IOtpReturn } from './interface/return.interface';

@Injectable()
export class ViewerService {
  constructor(
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
  ) {}

  signUp(signUpBody: ISignUpBody) {
    const hashPassword = hashPass(signUpBody.password);
    return true;
  }

  async otp(otpBody: IOtpBody): Promise<IOtpReturn> {
    const returnMes: IOtpReturn = {
      return: {
        status: HttpStatus.OK,
        message: 'message',
      },
    };
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
    const otp = createOtp(6);
    if (process.env.NODE_ENV === 'prod') {
      const isSend = await sendOtp(otpBody.mobile, otp);
      if (!isSend) {
        throw new HttpException(
          'خطا در ارسال پبام',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        const expires = expiresMin(+process.env.EXPIRES_OTP);
        existingOtp
          ? await this.otpModel.updateOne(
              { mobile: otpBody.mobile },
              { otp, expires },
            )
          : await new this.otpModel({
              mobile: otpBody.mobile,
              otp,
              expires,
            }).save();
        returnMes.return = {
          status: HttpStatus.ACCEPTED,
          message: 'کد ارسال شد',
          expires
        };
      }
    } else if (process.env.NODE_ENV === 'dev') {
      const expires = expiresMin(+process.env.EXPIRES_OTP);
      existingOtp
        ? await this.otpModel.updateOne(
            { mobile: otpBody.mobile },
            { otp, expires },
          )
        : await new this.otpModel({
            mobile: otpBody.mobile,
            otp,
            expires,
          }).save();
      returnMes.return = {
        status: HttpStatus.ACCEPTED,
        message: 'کد ارسال شد',
        otp,
      };
    }
    return returnMes;
  }
}
