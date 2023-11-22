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
import { PasswordTransformer } from '../password.tranformer';
import { UserLesson } from './user.lesson.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  otherName: string;

  @Column({
    nullable: false,
    length: 255,
    transformer: new PasswordTransformer(),
    select: false,
  })
  password: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true, select: false })
  emailToken?: string;

  @Column({ nullable: true, select: false })
  referralCode: string;

  @OneToMany(() => UserLesson, (lesson) => lesson.user)
  userlessons: UserLesson[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  // @OneToMany(() => Lesson, (lesson) => lesson.id)
  // lesson: Lesson[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
