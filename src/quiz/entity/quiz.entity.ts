import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from '../../lesson/entity/lesson.entity';

@Entity()
export class Quiz {
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
  question: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  options: string[];

  @Column({
    type: 'varchar',
    nullable: false,
  })
  correctOption: string;

  // @ManyToOne(() => Lesson, (lesson) => lesson.quizzes)
  // lesson: Lesson;
  @ManyToOne(() => Lesson, (lesson) => lesson.id, {
    eager: true,
  })
  @JoinColumn()
  lesson: Lesson;
}
