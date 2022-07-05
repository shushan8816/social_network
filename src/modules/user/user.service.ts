import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserNotFoundException } from '../../exceptions';
import { FindConditions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!userEntity) throw new UserNotFoundException();

    this.userRepository.merge(userEntity, updateUserDto);

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  async getAll(): Promise<UserEntity[]> {
    const userEntities = await this.userRepository
      .createQueryBuilder('users')
      .getMany();

    if (!userEntities) throw new UserNotFoundException();

    return userEntities;
  }

  async findOne(
    findData: FindConditions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(findData);
  }

  async getById(userId: string): Promise<UserEntity> {
    if (!isUUID(userId))
      throw new HttpException('User_id is incorrect', HttpStatus.BAD_REQUEST);

    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!userEntity) throw new UserNotFoundException();

    return userEntity;
  }

  async delete(userId: string) {
    if (!isUUID(userId))
      throw new HttpException('User_id is incorrect', HttpStatus.BAD_REQUEST);

    const userEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', {
        userId,
      })
      .getOne();
    if (!userEntity) throw new UserNotFoundException();

    await this.userRepository.remove(userEntity);

  }
}
