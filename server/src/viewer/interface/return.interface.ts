import { ISimpleReturn } from 'src/common/interface/returns.interface';
import { HttpStatus } from '@nestjs/common';

export interface IOtpReturnDTO extends ISimpleReturn {
  return: {
    message: string;
    status: HttpStatus;
    expires: number;
    otp?: string;
  };
}

export interface IFastOtpReturnDTO extends ISimpleReturn {
  return: {
    message: string;
    status: HttpStatus;
    expires: number;
    otp?: string;
  };
}

export interface ISignUpReturnDTO extends ISimpleReturn {
  return: {
    message: string;
    status: HttpStatus;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ISignInReturnDTO extends ISimpleReturn {
  return: {
    message: string;
    status: HttpStatus;
    accessToken: string;
    refreshToken: string;
  };
}