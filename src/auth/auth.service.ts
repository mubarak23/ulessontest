import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from 'src/utils/hash';
// import { MailingService } from 'src/utils/mailing/mailing.service';
// import { MailgunMailer } from '../../utils/mailGun';
import { ConfigService } from '../config/config.service';
import { Users } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AuthResponse } from './auth.response';

import { LoginPayload } from './dto/login.dto';
// const mailer = new MailgunMailer(process.env.MAILGUN_API_KEY, 'jobpro.app');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService, //  private readonly mailingService: MailingService, //  private readonly smsMessagingService: SmsMessagingService,
  ) {}

  async validateUser(payload: LoginPayload): Promise<Users> {
    const user = await this.userService.getUserWithPasswordByEmail(
      payload.email,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    if (!user.password || !user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return await this.userService.getByEmail(payload.email);
  }

  // async resetPassword(payload: CompleteResetPayload): Promise<ResetResponse> {
  //   const user = await this.userService.getByToken(payload.token);

  //   if (!user) {
  //     throw new NotAcceptableException('User not found');
  //   }

  //   await this.userService.updateUserAccount(user.email, {
  //     password: payload.password,
  //     emailToken: null,
  //   });

  //   return {
  //     status: 'ok',
  //     messsage: 'password updated',
  //   };
  // }

  async createToken(user: Users): Promise<AuthResponse> {
    return {
      expiresIn: Number(this.configService.get('JWT_EXPIRATION_TIME')),
      accessToken: this.jwtService.sign({
        id: user.id,
      }),
    };
  }
}
