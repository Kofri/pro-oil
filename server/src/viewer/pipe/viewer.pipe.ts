import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { log } from 'console';
import { ObjectSchema } from 'joi';
import { ProvincesEnum } from 'src/common/enum/province.enum';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}

@Injectable()
export class OtpPipes implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const province = value.province.trim();
    if (!Object.values(ProvincesEnum).includes(province)) {
      throw new HttpException(
        'استان فعلی تایید نمیشود',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
