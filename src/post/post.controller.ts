import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ObjectId } from 'typeorm';
import { Roles } from '../guard/roles.decorator';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: ObjectId) {
    return this.postService.findOneById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('CREATE_POST')
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('UPDATE_POST')
  async update(@Param('id') id: any, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('DELETE_POST')
  async remove(@Param('id') id: any) {
    return this.postService.remove(id);
  }
}
