import { ApiProperty } from '@nestjs/swagger';

export class AddLessonPayload {
  @ApiProperty()
  lessonId: string;
}
