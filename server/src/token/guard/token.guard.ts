import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  IRefreshTokenBodyDTO,
  IRefreshTokenModel,
  IRefreshTokenModelDTO,
} from '../interface/refresh-token.interface';
import { Model } from 'mongoose';
import { Jwt } from 'src/utils/jwt';
import { JwtService } from '@nestjs/jwt';
import { ISignUpModel, ISignUpModelDTO } from 'src/viewer/interface/sign-up.interface';
import { log } from 'console';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject('REFRESH_TOKEN_MODEL')
    private readonly refreshTokenModel: Model<IRefreshTokenModel>,
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshTokenBody: IRefreshTokenBodyDTO = request.body;
    const { refreshToken } = refreshTokenBody;
    const existingRefreshToken: IRefreshTokenModelDTO = await this.refreshTokenModel.findOne({
      refreshToken,
    });
    if (!existingRefreshToken) {
      throw new HttpException(
        'کاربری یافت نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const token = new Jwt(this.jwtService);
    const { mobile, expires } = await token.decodeToken(refreshToken)
    const now = new Date().getTime();
    if (now - expires < 0) {
      throw new HttpException(
        'توکن منقضی نشده',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingMember: ISignUpModelDTO = await this.signUpModel.findById(existingRefreshToken.id);
    if (!existingMember) {
      throw new HttpException(
        'کاربری یافت نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if( existingMember.mobile !== mobile) {
      throw new HttpException(
        'کاربری یافت نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }
}
