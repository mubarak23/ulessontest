/* eslint-disable prettier/prettier */
import { Note } from 'src/note/entity/note.entity';
import { Quiz } from 'src/quiz/entity/quiz.entity';
import { UserLesson } from 'src/user/entity/user.lesson.entity';
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
import { LessonVideo } from './lesson.video.entity';

@Entity('lessons')
export class Lesson {
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
    type: 'integer',
    nullable: true,
  })
  numberofVideo: number;

  @ManyToOne(() => UserLesson, (user) => user.lessons, {
    eager: true,
  })
  @JoinColumn()
  userLesson: UserLesson;

  @OneToMany(() => LessonVideo, (video) => video.lesson)
  videos: LessonVideo[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Quiz, (quiz) => quiz.lesson)
  quizes: Quiz[];

  // quizzes

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
