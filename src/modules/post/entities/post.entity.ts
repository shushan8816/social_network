import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entity/abstract.entity';
import { Uuid } from 'aws-sdk/clients/wisdom';
import { UserEntity } from '../../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from '../dto/post.dto';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity<PostDto> {
  @ApiProperty({ type: String })
  title: string;

  @Column({ type: 'uuid' })
  userId: Uuid;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
