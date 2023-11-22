import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserCreatePayload {
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
}

export class UserCreateOldPayload {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;
}

export class UserOnboardPayload {
  @ApiProperty({ example: 'john' })
  firstName: string;

  @ApiProperty({ example: 'doe' })
  lastName: string;

  @ApiProperty({ example: 'phil' })
  otherNames: string;

  @ApiProperty({ example: '2003/05/20' })
  dob: string;

  @ApiProperty({ example: 'female' })
  gender: string;

  @ApiProperty({ example: 'shomole yaba' })
  address: string;

  @ApiProperty({ example: 'Nigeria' })
  country: string;

  @ApiProperty({ example: '12345678' })
  bvn: string;
}

export class UpdateUserInforPayload {
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
}
