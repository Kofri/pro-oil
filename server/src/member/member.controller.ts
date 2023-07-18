import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('member')
@Controller('member')
export class MemberController {
    @Put('change-password')
    changePassword() {}
}
