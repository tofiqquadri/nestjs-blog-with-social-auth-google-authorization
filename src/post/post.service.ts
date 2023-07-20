import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId } from 'typeorm';
import { ObjectId as MongoObjectId } from 'mongodb';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: MongoRepository<Post>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOneById(id: ObjectId): Promise<Post> {
    id = new MongoObjectId(id);
    const post = await this.postRepository.findOneByOrFail({ _id: id });
    return post;
  }

  async create(createPostDto: CreatePostDto, user: any): Promise<Post> {
    const author = await this.userService.find({ email: user.email });
    createPostDto.author = author;   
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async update(id: any, updatePostDto: UpdatePostDto): Promise<Post> {
    id = new MongoObjectId(id);

    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new Error('Post not found.');
    }
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: any): Promise<void> {
    id = new MongoObjectId(id);
    await this.postRepository.delete(id);
  }
}
