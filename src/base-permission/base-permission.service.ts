import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePermission } from './base-permission.entity';
import { MongoRepository } from 'typeorm';
import { BasePermissionType } from '../constant/base-permissions';

@Injectable()
export class BasePermissionService {
  constructor(
    @InjectRepository(BasePermission)
    private basePermissionRepository: MongoRepository<BasePermission>,
  ) {}

  async findOrCreateBasePermission(
    name: BasePermissionType,
  ): Promise<BasePermission> {
    let basePermission = await this.basePermissionRepository.findOneBy({
      name,
    });

    if (!basePermission) {
      basePermission = new BasePermission();
      basePermission.name = name;

      basePermission = await this.basePermissionRepository.save(basePermission);
    }

    return basePermission;
  }
}
