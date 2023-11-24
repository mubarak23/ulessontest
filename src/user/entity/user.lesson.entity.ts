/* eslint-disable prettier/prettier */
import { Lesson } from 'src/lesson/entity/lesson.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user-lessons')
export class UserLesson {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lessonId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  userId: string;

  @OneToMany(() => Lesson, (lesson) => lesson.id)
  lesson: Lesson[];

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
