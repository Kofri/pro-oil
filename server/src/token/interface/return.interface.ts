import { HttpStatus } from '@nestjs/common';
import { ISimpleReturn } from 'src/common/interface/returns.interface';

export interface IRefreshTokenReturnDTO extends ISimpleReturn {
  return: {
    message: string;
    status: HttpStatus;
    accessToken: string;
    refreshToken: string;
  };
}
