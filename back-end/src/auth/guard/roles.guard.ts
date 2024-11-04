import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'src/common/enums';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const role = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!role) return true;
    
    const { user } = context.switchToHttp().getRequest();

    if (user.role === UserRole.ADMIN) return true;


    /* return roles.some((role)=>user.roles?.includes(role));*/
    return role === user.role;
  }
}
