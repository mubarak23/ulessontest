import { ApiProperty } from '@nestjs/swagger';
import { LessonVideo } from './entity/lesson.video.entity';

export class LessonVideoResponse {
  @ApiProperty()
  lessonvideo: LessonVideo;
}
