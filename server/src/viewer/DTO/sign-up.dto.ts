import { ApiProperty } from '@nestjs/swagger';

export class SignUpBody {
  @ApiProperty({
    description: 'the phone number',
    minLength: 11,
    maxLength: 11,
    example: '09*********',
    required: true,
    pattern: '/^09[0-9]{9}$/',
    type: String,
  })
  readonly mobile: string;

  @ApiProperty({
    description: 'the full name of the car',
    minLength: 3,
    maxLength: 30,
    example: '206 tu5',
    required: true,
    type: String,
  })
  readonly car: string;

  @ApiProperty({
    description: 'the car tag of member',
    minLength: 9,
    maxLength: 9,
    example: '12f123-12',
    required: true,
    pattern: '/^[0-9]{2}[\\u0600-\\u06FF]{1}[0-9]{3}-[0-9]{2}$/',
    type: String,
  })
  readonly tag: string;

  @ApiProperty({
    description: 'the gmail or yahoo of member',
    minLength: 11,
    maxLength: 11,
    example: '******@gmail.com',
    required: true,
    pattern: '/^[a-zA-Z0-9_.+-]+@(gmail|yahoo).*.[a-zA-Z]{2,6}$/',
    type: String,
  })
  readonly gmail: string;

  @ApiProperty({
    description: 'the phone number',
    minLength: 11,
    maxLength: 11,
    example: 'a******',
    required: true,
    pattern: '/^([a-z]|[A-Z])(\\w|#|&|%|@|\\$){5,}$/',
    type: String,
  })
  readonly password: string;

  @ApiProperty({
    description: 'the otp sended',
    minLength: 6,
    maxLength: 6,
    example: '123456',
    required: true,
    pattern: '/^[0-9]{6}$/',
    type: String,
  })
  readonly otp: string;
  @ApiProperty({
    description: 'the birth date',
    minLength: 2,
    maxLength: 15,
    example: 'hosein',
    required: true,
    type: String,
  })
  readonly name: string;

  @ApiProperty({
    description: 'the family of member',
    minLength: 2,
    maxLength: 20,
    example: 'jalali',
    required: true,
    type: String,
  })
  readonly family: string;

}
