import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { GetPostHandler } from './cmd/get-post.cmd';
import { CreatePostHandler } from './cmd/create-post.cmd';
import { UserService } from '../user/user.service';
import { CommandBus } from '@nestjs/cqrs';
import { UserRepository } from '../user/user.repository';

export const handlers = [CreatePostHandler, GetPostHandler];

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, UserRepository])],
  providers: [PostService, CommandBus, UserService, ...handlers],
  controllers: [PostController],
})
export class PostModule {}
