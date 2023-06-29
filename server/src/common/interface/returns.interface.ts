import { HttpStatus } from '@nestjs/common';

export interface ISimpleReturn {
  return: {
    message: string;
    status: HttpStatus;
  };
}
