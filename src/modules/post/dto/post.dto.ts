import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { IPostEntity } from '../entities/IPostEntity';

export class PostDto extends AbstractDto {
  @ApiPropertyOptional({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String })
  description: string;

  constructor(postEntity: IPostEntity) {
    super(postEntity);

    if (!postEntity) {
      return;
    }
    this.title = postEntity.title;
    this.description = postEntity.description;
  }
}
