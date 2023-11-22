import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  accessToken: string;
}
