import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TakeLessonQuiz {
  @ApiProperty({
    required: true,
    example: '434efa26-ecd2-4482-b341-a1ab40f87d28',
  })
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({
    required: true,
    example: '434efa26-ecd2-4482-b341-a1ab40f87d28',
  })
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({
    required: true,
    example: 'demo',
  })
  @IsNotEmpty()
  optionSelected: string;
}
