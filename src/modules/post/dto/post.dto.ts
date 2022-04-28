import { PostEntity } from '../entities/post.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';

export class PostDto extends AbstractDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  info: string;

  constructor(postEntity: PostEntity) {
    super(postEntity);
  }
}
