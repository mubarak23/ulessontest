import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginPayload {
  @ApiProperty({
    required: true,
    example: 'name@domain.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
