import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserQuiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  quizId: string;

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

  @Column({
    type: 'varchar',
    nullable: false,
  })
  optionSelected: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  isPass: boolean;
}
