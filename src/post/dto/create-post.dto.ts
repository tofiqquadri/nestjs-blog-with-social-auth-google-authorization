import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  author: User
}
