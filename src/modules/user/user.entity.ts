import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../enitites/base.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  constructor(data: Partial<UserEntity> = {}) {
    super();
    Object.assign(this, data);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2a\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // async checkPassword(plainPassword: string): Promise<boolean> {
  //   return await bcrypt.compare(plainPassword, this.password);
  // }
}
