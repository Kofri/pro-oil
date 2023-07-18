import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRefreshTokenModel } from 'src/token/interface/refresh-token.interface';
import { IRefreshTokenBodyDTO } from './interface/refresh-token.interface';
import { Jwt } from 'src/utils/jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @Inject('REFRESH_TOKEN_MODEL')
    private readonly refreshTokenModel: Model<IRefreshTokenModel>,
    private readonly jwtService: JwtService,
  ) {}
  async refreshToken(refreshTokenBody: IRefreshTokenBodyDTO) {
    const token = new Jwt(this.jwtService);
    const { accessToken, refreshToken } = await token.createToken(
      refreshTokenBody.mobile,
    );
    await this.refreshTokenModel.updateOne(
      { refreshToken: refreshTokenBody.refreshToken },
      { refreshToken },
    );
    return { accessToken, refreshToken };
  }
}
