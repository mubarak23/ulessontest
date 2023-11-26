import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomFourDigits } from 'src/utils/helper';
import { Repository } from 'typeorm';
import { UserCreatePayload } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserWithPasswordByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where('u.email = :email', { email })
      .getOne();
  }

  async create(payload: UserCreatePayload): Promise<User> {
    const userEmail = await this.getByEmail(payload.email);

    if (userEmail) {
      throw new NotAcceptableException(
        'User with provided details already created.',
      );
    }

    const emailToken = String(randomFourDigits());

    //send email verification token
    const emailTokenPayload = { email: payload.email, emailToken };
    //  await this.notificationsService.sendEmailTokenMessage(emailTokenPayload);

    await this.userRepository.save({ ...payload, emailToken });

    return await this.getByEmail(payload.email);
  }
}
