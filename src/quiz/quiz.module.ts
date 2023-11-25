import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from 'src/lesson/lesson.module';
import { Quiz } from './entity/quiz.entity';
import { UserQuiz } from './entity/user-quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    LessonModule,
    TypeOrmModule.forFeature([Quiz, UserQuiz]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
