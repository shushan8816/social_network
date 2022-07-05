import { PostDto } from '../dto/post.dto';
import { AbstractEntity } from '../../../common/entity/abstract.entity';

export interface IPostEntity extends AbstractEntity<PostDto> {
  title: string;
  description: string;
  userId: string;
}
