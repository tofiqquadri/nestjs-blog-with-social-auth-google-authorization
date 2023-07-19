import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialUser } from 'angularx-social-login';
import { User } from './user.entity';
import { BasePermissionService } from '../base-permission/base-permission.service';
import { MongoRepository, ObjectId } from 'typeorm';
import {
  BasePermissionType,
  NEW_USER_BASE_PERMISSIONS,
} from '../constant/base-permissions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
    private basePermissionService: BasePermissionService,
  ) {}

  create(user: User) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: ObjectId) {
    return this.userRepository.findOneBy({ _id: id });
  }

  update(id: ObjectId, user: User) {
    return this.userRepository.update(id, user);
  }

  remove(id: ObjectId) {
    return this.userRepository.delete(id);
  }

  async findOrCreateUser(socialUser: SocialUser): Promise<User> {
    console.log(socialUser);

    const email = socialUser.email;
    let user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      let basePermissions = [];

      for (let index = 0; index < NEW_USER_BASE_PERMISSIONS.length; index++) {
        const basePermissionType = NEW_USER_BASE_PERMISSIONS[index];
        const basePermission =
          await this.basePermissionService.findOrCreateBasePermission(
            basePermissionType,
          );
        basePermissions.push(basePermission);
      }

      user = this.userRepository.create({
        email: socialUser.email,
        name: socialUser.name,
        basePermissions: basePermissions,
      });
      user = await this.create(user);
    }

    return user;
  }
}
