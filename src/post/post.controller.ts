import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ObjectId } from 'typeorm';
import { Roles } from '../guard/roles.decorator';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll() {
    return this.postService.findAll(null);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @Roles('CREATE_POST', 'DELETE_POST', 'UPDATE_POST')
  async findAllAuthorPost(@Req() req: Request) {
    return this.postService.findAll(req.user);
  }

  @Get(':id')
  async find(@Param('id') id: ObjectId) {
    return this.postService.findOneById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('CREATE_POST')
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return this.postService.create(createPostDto, req.user);
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
