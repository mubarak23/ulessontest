/* eslint-disable prettier/prettier */
import { Note } from 'src/note/entity/note.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @OneToMany(() => LessonVideo, (video) => video.id)
  videos: LessonVideo[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
