import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../user/user.entity';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserService } from '../../user/user.service';
import { Uuid } from 'aws-sdk/clients/wisdom';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getString('JWT_SECRET'),
    });
  }

  async validate(args: { userId: Uuid }): Promise<UserEntity> {
    const user = await this.userService.findOne({
      id: args.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
