import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('account/member')
export class MemberController {
    @Get('')
    sayF(){
        return 'd'
    }
}
