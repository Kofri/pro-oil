import { JwtService } from '@nestjs/jwt';

export class Jwt {
  constructor(private readonly jwtService: JwtService) {}
  async createToken(
    mobile: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(
      { mobile },
      {
        expiresIn: process.env.EXPIRES_TOKEN,
        secret: process.env.SECRET_KEY_ACCESS_JWT,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { mobile },
      {
        expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
        secret: process.env.SECRET_KEY_REFRESH_JWT,
      },
    );
    return { accessToken, refreshToken };
  }
  async decodeToken(
    token: string,
  ): Promise<{ expires: number; mobile: string }> {
    const valueToken: any = await this.jwtService.decode(token);
    return { expires: valueToken.exp , mobile: valueToken.mobile };
  }
}
