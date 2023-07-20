import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthModule, UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [TypeOrmModule]
})
export class PostModule {}
