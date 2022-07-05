import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserService } from '../user/user.service';
import { Uuid } from 'aws-sdk/clients/wisdom';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { UserNotFoundException } from '../../exceptions';
import bcrypt from 'bcrypt';

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

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    const isPasswordValid = await bcrypt.hash(userLoginDto.password, 10);

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user!;
  }
}
