import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ISignUpBodyDTO, ISignUpModel } from './interface/sign-up.interface';
import { hashPass } from 'src/utils/hashing';
import { Model } from 'mongoose';
import {
  IOtpBodyDTO,
  IOtpModel,
  IOtpModelDTO,
} from './interface/otp.interface';
import { createOtp, expiresMin, sendOtp } from 'src/utils/sms';
import {
  IFastOtpReturnDTO,
  IOtpReturnDTO,
  ISignInReturnDTO,
  ISignUpReturnDTO,
} from './interface/return.interface';
import { RolesEnum } from '../common/enum/role.enum';
import { IFastOtpBodyDTO, IFastOtpModel } from './interface/fast-otp.interface';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import { IRefreshTokenModel } from '../token/interface/refresh-token.interface';
import { ISignInBodyDTO } from './interface/sign-in.interface';
import { Jwt } from 'src/utils/jwt';

@Injectable()
export class ViewerService {
  constructor(
    @Inject('REFRESH_TOKEN_MODEL')
    private readonly refreshTokenModel: Model<IRefreshTokenModel>,
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    @Inject('OTP_MODEL') private readonly otpModel: Model<IOtpModel>,
    @Inject('FAST_OTP_MODEL')
    private readonly fastOtpModel: Model<IFastOtpModel>,
    private readonly jwtService: JwtService,
  ) {}

  async fastOtp(fastOtpBody: IFastOtpBodyDTO): Promise<IFastOtpReturnDTO> {
    const returnMes: IFastOtpReturnDTO = {
      return: {
        message: 'message',
        status: HttpStatus.OK,
        expires: new Date().getTime(),
      },
    };
    const existingOtp = await this.fastOtpModel.findOne({
      mobile: fastOtpBody.mobile,
    });
    const otp = createOtp(6);
    if (process.env.NODE_ENV === 'prod') {
      const isSend = await sendOtp(fastOtpBody.mobile, otp);
      if (!isSend) {
        throw new HttpException(
          'خطا در ارسال پبام',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        const expires = expiresMin(+process.env.EXPIRES_OTP);
        try {
          existingOtp
            ? await this.fastOtpModel.updateOne(
                { mobile: fastOtpBody.mobile },
                { otp, expires },
              )
            : await new this.fastOtpModel({
                mobile: fastOtpBody.mobile,
                otp,
                expires,
              }).save();
        } catch (error) {
          log(error);
        }
        returnMes.return = {
          status: HttpStatus.ACCEPTED,
          message: 'کد ارسال شد',
          expires,
        };
      }
    } else if (process.env.NODE_ENV === 'dev') {
      const expires = expiresMin(+process.env.EXPIRES_OTP);
      try {
        existingOtp
          ? await this.fastOtpModel.updateOne(
              { mobile: fastOtpBody.mobile },
              { otp, expires },
            )
          : await new this.fastOtpModel({
              mobile: fastOtpBody.mobile,
              otp,
              expires,
            }).save();
      } catch (error) {
        log(error);
      }
      returnMes.return = {
        status: HttpStatus.ACCEPTED,
        message: 'کد ارسال شد',
        expires,
        otp,
      };
    }
    return returnMes;
  }

  async otp(otpBody: IOtpBodyDTO): Promise<IOtpReturnDTO> {
    const returnMes: IOtpReturnDTO = {
      return: {
        status: HttpStatus.OK,
        message: 'message',
        expires: new Date().getTime(),
      },
    };
    const {
      birthDate,
      city,
      mobile,
      nationalCode,
      province,
      address,
      postalCode,
    } = otpBody;
    const existingOtp = await this.otpModel.findOne({ mobile: otpBody.mobile });
    try {
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
          try {
            existingOtp
              ? await this.otpModel.updateOne(
                  { mobile },
                  {
                    nationalCode,
                    birthDate,
                    otp,
                    expires,
                    postalCode,
                    province,
                    city,
                    address,
                  },
                )
              : await new this.otpModel({
                  mobile,
                  nationalCode,
                  birthDate,
                  otp,
                  expires,
                  postalCode,
                  province,
                  city,
                  address,
                }).save();
          } catch (error) {
            log(error);
          }
          returnMes.return = {
            status: HttpStatus.ACCEPTED,
            message: 'کد ارسال شد',
            expires,
          };
        }
      } else if (process.env.NODE_ENV === 'dev') {
        const expires = expiresMin(+process.env.EXPIRES_OTP);
        try {
          existingOtp
            ? await this.otpModel.updateOne(
                { mobile },
                {
                  nationalCode,
                  birthDate,
                  otp,
                  expires,
                  postalCode,
                  province,
                  city,
                  address,
                },
              )
            : await new this.otpModel({
                mobile,
                nationalCode,
                birthDate,
                otp,
                expires,
                postalCode,
                province,
                city,
                address,
              }).save();
        } catch (error) {
          log(error);
        }
        returnMes.return = {
          status: HttpStatus.ACCEPTED,
          message: 'کد ارسال شد',
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

  async signIn(signInBody: ISignInBodyDTO) {
    const returnMes: ISignInReturnDTO = {
      return: {
        message: 'message',
        status: HttpStatus.OK,
        accessToken: '',
        refreshToken: '',
      },
    };
    const member = await this.signUpModel.findOne({
      mobile: signInBody.mobile,
    });
    const token = new Jwt(this.jwtService);
    const { accessToken, refreshToken } = await token.createToken(
      signInBody.mobile,
    );
    await this.refreshTokenModel.updateOne(
      { id: member._id },
      { refreshToken },
    );
    returnMes.return = {
      message: 'ورود انجام شد',
      status: HttpStatus.ACCEPTED,
      accessToken,
      refreshToken,
    };
    return returnMes;
  }

  async signUp(signUpBody: ISignUpBodyDTO): Promise<ISignUpReturnDTO> {
    const returnMes: ISignUpReturnDTO = {
      return: {
        message: 'message',
        status: HttpStatus.OK,
        accessToken: '',
        refreshToken: '',
      },
    };
    const hashPassword = hashPass(signUpBody.password);
    signUpBody.password = hashPassword;
    const { mobile, car, gmail, password, tag, name, family } = signUpBody;
    const viewer: IOtpModelDTO = await this.otpModel.findOneAndDelete({
      mobile,
    });
    const { birthDate, city, nationalCode, postalCode, province, address } =
      viewer;
    let role = [];
    process.env.MOBILE_ADMIN === mobile
      ? (role = [
          RolesEnum.ADMIN,
          RolesEnum.BLOGGER,
          RolesEnum.MEMBER,
          RolesEnum.TRANSFER,
        ])
      : role = [RolesEnum.MEMBER];
    const newMember = await new this.signUpModel({
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
      role,
    }).save();
    const token = new Jwt(this.jwtService);
    const { accessToken, refreshToken } = await token.createToken(
      signUpBody.mobile,
    );
    await new this.refreshTokenModel({
      id: newMember._id,
      refreshToken,
    }).save();
    returnMes.return = {
      message: 'ثبت نام کاربر انجام شد',
      status: HttpStatus.CREATED,
      accessToken,
      refreshToken,
    };
    return returnMes;
  }
}
