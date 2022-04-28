import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from '../user/user.entity';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private postService: PostService) {}

  //   @Post()
  //   @HttpCode(HttpStatus.CREATED)
  //   @ApiCreatedResponse({ type: PostDto })
  //   async createPost(@Body() createPostDto: CreatePostDto) {
  //     const postEntity = await this.postService.createPost(createPostDto);
  //
  //     return postEntity.toDto();
  //   }
  //
  //   @Get()
  //   @ApiPageOkResponse({ type: PostDto })
  //   async getPosts(
  //     @Query() postsPageOptionsDto: PostPageOptionsDto,
  //   ): Promise<PageDto<PostDto>> {
  //     return this.postService.getAllPost(postsPageOptionsDto);
  //   }
  //
  //   @Get(':id')
  //   @HttpCode(HttpStatus.OK)
  //   @ApiOkResponse({ type: PostDto })
  //   async getSinglePost(@UUIDParam('id') id: Uuid): Promise<PostDto> {
  //     const entity = await this.postService.getSinglePost(id);
  //
  //     return entity.toDto();
  //   }
  //
  //   @Put(':id')
  //   @HttpCode(HttpStatus.ACCEPTED)
  //   @ApiAcceptedResponse()
  //   updatePost(
  //     @UUIDParam('id') id: Uuid,
  //     @Body() updatePostDto: UpdatePostDto,
  //   ): Promise<void> {
  //     return this.postService.updatePost(id, updatePostDto);
  //   }
  //
  //   @Delete(':id')
  //   @HttpCode(HttpStatus.ACCEPTED)
  //   @ApiAcceptedResponse()
  //   async deletePost(@UUIDParam('id') id: Uuid): Promise<void> {
  //     await this.postService.deletePost(id);
  //   }
}
