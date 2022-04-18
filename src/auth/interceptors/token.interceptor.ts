import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserEntity } from '../../modules/user/user.entity';
import { AuthHelper } from '../../auth/helpers/auth-helper';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authHelper: AuthHelper) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<UserEntity>,
  ): Observable<UserEntity> {
    return next.handle().pipe(
      map((user) => {
        const response = context.switchToHttp().getResponse<Response>();
        const token = this.authHelper.generateToken(user);

        response.setHeader('Authorization', `Bearer ${token}`);
        response.cookie('token', token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        return user;
      }),
    );
  }
}
