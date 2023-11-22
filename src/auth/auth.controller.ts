import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthResponse } from './auth.response';
import { AuthService } from './auth.service';
import { LoginPayload } from './dto/login.dto';
import { RegisterPayload } from './dto/register.dto';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Successful Registration',
    type: AuthResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: AuthResponse })
  async register(@Body() payload: RegisterPayload): Promise<AuthResponse> {
    const user = await this.userService.create(payload);
    return this.authService.createToken(user);
  }

  @Post('register-new')
  @ApiResponse({
    status: 201,
    description: 'Successful Registration',
    type: AuthResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: AuthResponse })
  async registernew(@Body() payload: RegisterPayload): Promise<AuthResponse> {
    const user = await this.userService.create(payload);
    return this.authService.createToken(user);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Successful Login',
    type: AuthResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: AuthResponse })
  async login(@Body() payload: LoginPayload): Promise<AuthResponse> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }
}
