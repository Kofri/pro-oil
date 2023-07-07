import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ISignUpBodyDTO, ISignUpModel } from './interface/sign-up.interface';
import { IResultSearchLine } from './interface/search-line.interface';
import { hashPass } from 'src/utils/hashing';
import { Model } from 'mongoose';
import {
  IOtpBodyDTO,
  IOtpModel,
  IOtpModelDTO,
} from './interface/otp.interface';
import { createOtp, expiresMin, sendOtp } from 'src/utils/sms';
import { IOtpReturnDTO, ISignUpReturnDTO } from './interface/return.interface';
import { Roles } from '../common/enum/role.enum';
import axios from 'axios';

@Injectable()
export class ViewerService {
  constructor(
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
  ) {}

  async signIn(){

  }

  async signUp(signUpBody: ISignUpBodyDTO): Promise<ISignUpReturnDTO> {
    const returnMes: ISignUpReturnDTO = {
      return: {
        message: 'message',
        status: HttpStatus.OK,
      },
    };
    const hashPassword = hashPass(signUpBody.password);
    signUpBody.password = hashPassword;
    const viewer: IOtpModelDTO = await this.otpModel.findOne(
      { mobile: signUpBody.mobile },
      { __v: 0 },
    );
    if (!viewer) {
      throw new HttpException('کاربری یافت نشد', HttpStatus.NOT_FOUND);
    }
    const { mobile, car, gmail, password, tag } = signUpBody;
    const {
      address,
      birthDate,
      city,
      nationalCode,
      postalCode,
      province,
      name,
      family,
    } = viewer;
    const existMobileUser = await this.signUpModel.findOne({ mobile });
    const existGmailUser = await this.signUpModel.findOne({ gmail });
    const existNationalUser = await this.signUpModel.findOne({ nationalCode });
    const existTagUser = await this.signUpModel.findOne({ tag });
    const timestamp = viewer.expires - new Date().getTime();
    if (viewer.otp !== signUpBody.otp) {
      await this.otpModel.deleteOne({ _id: viewer._id });
      throw new HttpException('کد احراز هویت صحبح نیست', HttpStatus.NOT_FOUND);
    } else if (timestamp <= 0) {
      await this.otpModel.deleteOne({ _id: viewer._id });
      throw new HttpException(
        'کد احراز هویت منقضی شده است',
        HttpStatus.GATEWAY_TIMEOUT,
      );
    }
    await this.otpModel.deleteOne({ _id: viewer._id });
    if (existMobileUser) {
      throw new HttpException(
        'کاربری با این موبایل وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (existGmailUser) {
      throw new HttpException(
        'کاربری با این جیمیل وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (existNationalUser) {
      throw new HttpException(
        'کاربری با این کد ملی وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (existTagUser) {
      throw new HttpException(
        'کاربری با این پلاک وجود دارد',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if(process.env.MOBILE_ADMIN === mobile) {
      await new this.signUpModel({
        mobile,
        car,
        gmail,
        password,
        tag,
        address,
        birthDate,
        city,
        nationalCode,
        postalCode,
        province,
        name,
        family,
        role: [Roles.ADMIN, Roles.BLOGGER, Roles.MEMBER, Roles.TRANSFER]
      }).save();
    }
    await new this.signUpModel({
      mobile,
      car,
      gmail,
      password,
      tag,
      address,
      birthDate,
      city,
      nationalCode,
      postalCode,
      province,
      name,
      family,
      role: [Roles.MEMBER]
    }).save();
    returnMes.return = {
      message: 'ثبت نام کاربر انجام شد',
      status: HttpStatus.CREATED
    }
    return returnMes;
  }

  async otp(otpBody: IOtpBodyDTO): Promise<IOtpReturnDTO> {
    const returnMes: IOtpReturnDTO = {
      return: {
        status: HttpStatus.OK,
        message: 'message',
        name: 'unknown',
        family: 'unknown',
        expires: new Date().getTime(),
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
    try {
      const otp = createOtp(6);
      if (process.env.NODE_ENV === 'prod') {
        const resultSearchLine: IResultSearchLine = await axios.get(
          'https://inquery.ir/:80',
          {
            params: {
              token: process.env.API_KEY_SEARCH_LINK,
              op: 'IdCode',
              BirthDate: otpBody.birthDate,
              IdCode: otpBody.nationalCode,
            },
          },
        );
        if (!resultSearchLine) {
          throw new HttpException(
            'خطا در شناسایی کاربر رخ داد',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
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
                nationalCode: otpBody.nationalCode,
                birthDate: otpBody.birthDate,
                otp,
                expires,
                name: resultSearchLine.Result.Name,
                family: resultSearchLine.Result.Family,
                postalCode: resultSearchLine.Result.PostalCode,
                province: resultSearchLine.Result.Province,
                city: resultSearchLine.Result.City,
                address: resultSearchLine.Result.Address,
              }).save();
          returnMes.return = {
            status: HttpStatus.ACCEPTED,
            message: 'کد ارسال شد',
            name: resultSearchLine.Result.Name,
            family: resultSearchLine.Result.Family,
            expires,
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
              nationalCode: otpBody.nationalCode,
              birthDate: otpBody.birthDate,
              otp,
              expires,
            }).save();
        returnMes.return = {
          status: HttpStatus.ACCEPTED,
          message: 'کد ارسال شد',
          name: 'nam-unknown',
          family: 'fam-unknown',
          otp,
          expires,
        };
      }
    } catch (error) {
      throw new HttpException(
        'خطا در شناسایی کاربر رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return returnMes;
  }

}
