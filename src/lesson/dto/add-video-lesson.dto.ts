import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddVideoLesson {
  @ApiProperty({
    required: true,
    example: 'non metals',
  })
  @IsEmail()
  name: string;

  @ApiProperty({
    required: true,
    example: 'demo description of the lesson video',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    example: 'de08994f09-fc31-4e87-b937-24e7038ed68cn',
  })
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({
    required: true,
    example: 'http://localhost:4505/api/docs#//metal.md',
  })
  @IsNotEmpty()
  videolink: string;
}
