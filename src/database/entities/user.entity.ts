import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  age: number;

  @Column()
  phone: string;
}
