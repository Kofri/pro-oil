import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from 'src/utils/jwt';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: any, res: any, next: () => void) {
    const token = new Jwt(this.jwtService);
    const { refreshToken } = req.body;
    const { mobile } = await token.decodeToken(refreshToken);
    const body = {...req.body, mobile}
    req.body = body;
    next();
  }
}
