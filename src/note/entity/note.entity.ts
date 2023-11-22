/* eslint-disable prettier/prettier */
import { Lesson } from 'src/lesson/entity/lesson.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  videotime: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lessonvideoId: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lessonId: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.id, {
    eager: true,
  })
  lesson: Lesson;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
