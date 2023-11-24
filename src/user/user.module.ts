import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from 'src/lesson/lesson.module';
import { NoteModule } from 'src/note/note.module';
import { User } from './entity/user.entity';
import { UserLesson } from './entity/user.lesson.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    LessonModule,
    NoteModule,
    TypeOrmModule.forFeature([User, UserLesson]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
