import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BasePermissionModule } from '../base-permission/base-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BasePermissionModule],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
