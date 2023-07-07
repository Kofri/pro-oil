import { ApiProperty } from '@nestjs/swagger';

export class OtpBody {
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
    description: 'the national code',
    minLength: 10,
    maxLength: 10,
    example: '1234567890',
    required: true,
    pattern: '/^[0-9]{10}$/',
    type: String,
  })
  readonly nationalCode: string;
  @ApiProperty({
    description: 'the birth date',
    minLength: 10,
    maxLength: 10,
    example: '1325/02/31',
    required: true,
    pattern: '/^1(3|4)[0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-2]\/(0[1-9]|[1-2][0-9]|30)))$/',
    type: String,
  })
  readonly birthDate: string;
}
