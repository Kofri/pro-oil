import { ISimpleReturn } from "src/common/interface/returns.interface";
import { HttpStatus } from '@nestjs/common';

export interface IOtpReturnDTO extends ISimpleReturn {
    return: {
      message: string;
      status: HttpStatus;
      expires: number;
      name: string;
      family: string;
      otp?: string;
    };
  }

export interface ISignUpReturnDTO extends ISimpleReturn {
  return: {
    message: string;
    status: HttpStatus;
  }
}