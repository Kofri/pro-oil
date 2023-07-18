import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  @Post('add-role')
  addRole() {}

  @Post('add-product')
  addProduct() {}

  @Post('answer-ticket')
  answerTicket() {}

  @Put('edit-product')
  editProduct() {}

  @Get('get-products')
  getProducts() {}

  @Get('get-sales')
  getSales() {}

  @Delete('delete-product')
  deleteProduct() {}
}
