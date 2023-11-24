import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from './entity/lesson.entity';

export class LessonResponse {
  @ApiProperty()
  lesson: Lesson;
}
