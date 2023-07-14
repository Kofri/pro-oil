import { ApiProperty } from '@nestjs/swagger';

export class FastOtpBody {
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
}
