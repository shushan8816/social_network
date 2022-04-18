import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Param,
  HttpException,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: 201,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      return this.userService.update(updateUserDto, userId);
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: 201,
    description: 'The users has been successfully get.',
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  getUsers() {
    try {
      return this.userService.getAll();
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully get.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getUserById(@Param('userId') userId: string) {
    try {
      return this.userService.getById(userId);
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteUser(@Param('userId') userId: string) {
    try {
      return this.userService.delete(userId);
    } catch (error) {
      throw new HttpException(error, error.getStatus());
    }
  }
}
