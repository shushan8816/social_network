import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../../common/entity/abstract.entity';
import { UserDto } from './dto/user.dto';
import { PostEntity } from '../post/entities/post.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends AbstractEntity<UserDto> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string ;

  @Column({ nullable: true })
  avatar?: string;

  constructor(data: Partial<UserEntity> = {}) {
    super();
    Object.assign(this, data);
  }

  @OneToMany(() => PostEntity, (postEntity) => postEntity.user)
  posts: PostEntity[];
}
