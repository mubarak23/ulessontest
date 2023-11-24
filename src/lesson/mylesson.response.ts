import { ApiProperty } from '@nestjs/swagger';
import { Note } from 'src/note/entity/note.entity';
import { Lesson } from './entity/lesson.entity';

export class MyLessonResponse {
  @ApiProperty()
  lesson: Lesson;

  @ApiProperty()
  notes?: Note[];
}
