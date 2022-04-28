import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserService } from '../user/user.service';
import { Uuid } from 'aws-sdk/clients/wisdom';
import { TokenPayloadDto } from './dto/tokenPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: { userId: Uuid }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
      }),
    });
  }

  async validateUser(loginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: loginDto.email,
    });
    return user!;
  }
}
