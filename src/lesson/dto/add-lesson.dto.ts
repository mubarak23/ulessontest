import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddLesson {
  @ApiProperty({
    required: true,
    example: 'non metals',
  })
  @IsEmail()
  name: string;

  @ApiProperty({
    required: true,
    example: 'demo description of the lesson',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    example: 'demo description of the lesson',
  })
  @IsNotEmpty()
  numberofVideo: number;
}
