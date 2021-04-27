import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = AuthGuard.getTokenFromRequest(request);

    console.log('AuthGuard: accessToken is', accessToken);
    if (!accessToken) throw new UnauthorizedException();

    const isValidToken = await this.authService.hasValidAccessToken(
      accessToken,
    );

    console.log('AuthGuard: isValidToken is', isValidToken);
    if (!isValidToken) throw new UnauthorizedException();

    return true;
  }

  private static getTokenFromRequest(request: Request) {
    const { authorization } = request.headers;

    return authorization?.split('Bearer ')[1];
  }
}
