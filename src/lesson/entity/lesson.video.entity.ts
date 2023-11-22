/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity('lesson-videos')
export class LessonVideo {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lessonId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  videolink: string;

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
