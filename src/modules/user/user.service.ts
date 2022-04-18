import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.userRepository.save(createUserDto);
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    if (!isUUID(id))
      throw new HttpException('User id is incorrect', HttpStatus.BAD_REQUEST);

    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', {
        id,
      })
      .getOne();

    if (!userEntity)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    this.userRepository.merge(userEntity, updateUserDto);

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  async getAll(): Promise<UserEntity[]> {
    const userEntities = await this.userRepository
      .createQueryBuilder('users')
      .getMany();

    if (!userEntities)
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);

    return userEntities;
  }

  async getById(id: string): Promise<UserEntity> {
    if (!isUUID(id))
      throw new HttpException('User id is incorrect', HttpStatus.BAD_REQUEST);

    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!userEntity)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return userEntity;
  }

  async delete(id: string) {
    if (!isUUID(id))
      throw new HttpException('User id is incorrect', HttpStatus.BAD_REQUEST);

    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', {
        id,
      })
      .getOne();

    if (!userEntity)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await this.userRepository.remove(userEntity);

    return userEntity;
  }
}
