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
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
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
    return this.userService.update(updateUserDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: 201,
    description: 'The users has been successfully get.',
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully get.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getUserById(@Param('id') userId: string) {
    return this.userService.getById(userId);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteUser(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
