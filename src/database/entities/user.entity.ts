import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from "./enums/table-name.enum";

import { CreatedUpdatedModel } from './models/created-updated.model';
import { PostEntity } from './post.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USER)
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  firstName: string;

  @Column({ type: 'text', nullable: true })
  lastName: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => PostEntity, (entity) => entity.user)
  postEntity?: PostEntity[];
}
