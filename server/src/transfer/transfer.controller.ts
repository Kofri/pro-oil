import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
    @Post('transfer-product')
    transferProduct(){}
    
    @Post('otp-transfer-product')
    otpTransferProduct(){}
}
