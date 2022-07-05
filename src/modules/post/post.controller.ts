import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthUser } from '../../decorators/auth-ures.decorator';
import { UserEntity } from '../user/user.entity';
import { GetPostHandler } from './cmd/get-post.cmd';
import { CreatePostCommand } from './cmd/create-post.cmd';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: PostDto })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @AuthUser() user: UserEntity,
  ) {
    const postEntity = await this.postService.createPost(
      user.id,
      createPostDto,
    );
    return postEntity;
  }

  @Get()
  @ApiOkResponse({ type: PostDto })
  async getPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPost();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PostDto })
  async getSinglePost(@Param('id') id: GetPostHandler): Promise<PostEntity> {
    return this.postService.getSinglePost(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updatePost(
    @Param('id') userId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(userId, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  async deletePost(@Param('id') userId: string): Promise<void> {
    await this.postService.deletePost(userId);
  }
}
