import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.model';

export enum PetPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  pet_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ type: 'enum', enum: PetPostStatus, default: 'pending' })
  status: PetPostStatus;

  @Column({ type: 'varchar', length: 255 })
  owner: string;

  @Column({ type: 'boolean', default: false })
  hasFound: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.petPost)
  user: User;
}
