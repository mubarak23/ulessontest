import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditLessonNote {
  @ApiProperty({
    required: true,
    example: 'note contents',
  })
  @IsNotEmpty()
  content: string;
}
