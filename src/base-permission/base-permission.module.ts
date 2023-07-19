import { Module } from '@nestjs/common';
import { BasePermission } from './base-permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasePermissionService } from './base-permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([BasePermission])],
  exports: [TypeOrmModule, BasePermissionService],
  providers: [BasePermissionService],
})
export class BasePermissionModule {}
