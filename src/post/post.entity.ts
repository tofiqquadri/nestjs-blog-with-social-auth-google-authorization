import { User } from 'src/user/user.entity';
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Post {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  author: User;
}
