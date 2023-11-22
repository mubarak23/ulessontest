import { Module } from '@nestjs/common';
import { Lesson } from './entity/lesson.entity';
import { LessonVideo } from './entity/lesson.video.entity';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [Lesson, LessonVideo],
  providers: [LessonService],
  controllers: [LessonController],
})
export class LessonModule {}
