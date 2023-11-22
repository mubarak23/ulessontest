import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
// import { Unique } from '../../common';

export class RegisterPayload {
  @ApiProperty({ required: true, example: 'spark' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true, example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false, example: 'John' })
  otherName: string;

  @ApiProperty({
    required: true,
    example: 'demo@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
