import { ISimpleReturn } from "src/common/interface/returns.interface";
import { HttpStatus } from '@nestjs/common';

export interface IOtpReturn extends ISimpleReturn {
    return: {
      message: string;
      status: HttpStatus;
      otp?: string;
      expires?: number;
    };
  }
  