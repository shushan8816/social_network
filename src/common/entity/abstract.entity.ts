import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AbstractDto } from '../dto/abstract.dto';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date;

  // private dtoClass: Constructor<DTO, [AbstractEntity, O?]>;
  // toDto(options?: O): DTO {
  //   const dtoClass = this.dtoClass;
  //
  //   if (!dtoClass) {
  //     throw new Error(
  //       `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
  //     );
  //   }
  //
  //   return new this.dtoClass(this, options);
  // }
}
