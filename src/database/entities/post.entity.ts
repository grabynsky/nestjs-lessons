import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedModel } from './models/created-updated.model';
import { UserEntity } from './user.entity';

@Entity('post')
export class PostEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.postEntity)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
