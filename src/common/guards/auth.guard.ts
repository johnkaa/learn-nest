import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException("You're not authorizated");
    }

    return true;
  }
}
