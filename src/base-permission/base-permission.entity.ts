import { BasePermissionType } from '../constant/base-permissions';
import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class BasePermission {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({
    unique: true,
    nullable: false,
    type: 'enum',
    enum: BasePermissionType,
  })
  name: BasePermissionType;
}
