import { Body, Controller, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from './guard/token.guard';
import { TokenService } from './token.service';
import { RefreshTokenBody } from './DTO/refresh-token.dto';
import { JoiValidationPipe } from 'src/viewer/pipe/viewer.pipe';
import { refreshTokenSchema } from './schema/refresh-token.schema';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}
  @Put('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @UsePipes(new JoiValidationPipe(refreshTokenSchema))
  refreshToken(@Body() refreshTokenBody: RefreshTokenBody) {
    return this.tokenService.refreshToken(refreshTokenBody);
  }
}
