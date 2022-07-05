import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entity/abstract.entity';
import { UserEntity } from '../../user/user.entity';
import { PostDto } from '../dto/post.dto';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity<PostDto> {
  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
