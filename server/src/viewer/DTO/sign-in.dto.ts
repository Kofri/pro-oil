import { ApiProperty } from '@nestjs/swagger';

export class SignInBody {
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
    description: 'the otp sended',
    minLength: 6,
    maxLength: 6,
    example: '123456',
    required: true,
    pattern: '/^[0-9]{6}$/',
    type: String,
  })
  readonly otp: string;
}
