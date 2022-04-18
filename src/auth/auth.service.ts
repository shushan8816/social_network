import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './helpers/auth-helper';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  @Inject(AuthHelper) private readonly helper: AuthHelper;

  public async register(registerDto: RegisterDto): Promise<UserEntity> {
    let user: UserEntity = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    user = new UserEntity();
    return this.userRepository.save(user);
  }

  public async login(loginDto: LoginDto): Promise<string> {
    const { email, password }: LoginDto = loginDto;
    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return this.helper.generateToken(user);
  }
}
