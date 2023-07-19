import { BasePermission } from 'src/base-permission/base-permission.entity';
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  basePermissions: BasePermission[];
}
