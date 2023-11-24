import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLesson } from 'src/user/entity/user.lesson.entity';
import { Lesson } from './entity/lesson.entity';
import { LessonVideo } from './entity/lesson.video.entity';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, LessonVideo, UserLesson]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [LessonService],
  controllers: [LessonController],
  exports: [LessonService],
})
export class LessonModule {}
