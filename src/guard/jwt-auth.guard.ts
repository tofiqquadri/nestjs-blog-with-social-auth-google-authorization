import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector, // Inject the Reflector service
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(token);
      
      request.user = decodedToken;
      
      // Check if the required permissions are present in the decoded token
      const requiredPermissions = this.getRequiredPermissions(context);
      
      if (requiredPermissions.length > 0) {
        const userPermissions = decodedToken.basePermissions || [];
        const hasPermission = requiredPermissions.every((permission) =>
          userPermissions.includes(permission),
        );

        if (!hasPermission) {
          throw new UnauthorizedException('Insufficient permissions');
        }
      }

      return true;
    } catch (error) {        
      throw new UnauthorizedException('Invalid token', error.message);
    }
  }

  private getRequiredPermissions(context: ExecutionContext): string[] {
    // Extract and return the required permissions from the controller route metadata
    return this.reflector.get<string[]>('roles', context.getHandler()) || [];
  }
}
