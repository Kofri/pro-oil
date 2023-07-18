import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blogger')
@Controller('blogger')
export class BloggerController {
    @Post('add-blog')
    addBlog() {}

    @Post('edit-blog')
    editBlog() {}

    @Post('delete-blog')
    deleteBlog() {}
}
