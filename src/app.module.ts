// import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
// import { Kyc, KycModule } from '../kyc';

import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { Lesson } from './lesson/entity/lesson.entity';
import { LessonVideo } from './lesson/entity/lesson.video.entity';
import { LessonModule } from './lesson/lesson.module';
import { Note } from './note/entity/note.entity';
import { NoteController } from './note/note.controller';
import { NoteModule } from './note/note.module';
import { Quiz } from './quiz/entity/quiz.entity';
import { UserQuiz } from './quiz/entity/user-quiz.entity';
import { QuizModule } from './quiz/quiz.module';
import { UserLesson } from './user/entity/user.lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [
            User,
            Lesson,
            LessonVideo,
            UserLesson,
            Note,
            Quiz,
            UserQuiz,
          ],
          synchronize: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    AuthModule,
    UserModule,
    LessonModule,
    NoteModule,
    QuizModule,
  ],
  controllers: [AppController, NoteController],
  providers: [AppService],
})
export class AppModule {}
