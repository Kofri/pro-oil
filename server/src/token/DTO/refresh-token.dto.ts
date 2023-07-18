import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenBody {
  @ApiProperty({
    description: 'the refresh token',
    example: 'xxx.yyy.zzz',
    required: true,
    pattern: '/^[A-Za-z0-9-_]*\\.[A-Za-z0-9-_]*\\.[A-Za-z0-9-_]*$/',
    type: String,
  })
  readonly refreshToken: string;
  readonly mobile: string;
}
