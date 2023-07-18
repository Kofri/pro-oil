import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Post('purchase-statistics')
  purchaseStatistics() {}
  
  @Post('ticket-register')
  ticketRegister() {}
  
  @Get('get-transactions')
  getTransactions() {}
}
