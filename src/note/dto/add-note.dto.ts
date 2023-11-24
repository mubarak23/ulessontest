import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddLessonNote {
  @ApiProperty({
    required: true,
    example: 'note contents',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    required: true,
    example: '34:45',
  })
  @IsNotEmpty()
  videotime: string;

  @ApiProperty({
    required: true,
    example: 'de08994f09-fc31-4e87-b937-24e7038ed68cn',
  })
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({
    required: true,
    example: 'de08994f09-fc31-4e87-b937-24e7038ed68cn',
  })
  @IsNotEmpty()
  lessonvideoId: string;
}
