import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from 'src/lesson/lesson.module';
import { Note } from './entity/note.entity';
import { NoteService } from './note.service';

@Module({
  imports: [
    LessonModule,
    TypeOrmModule.forFeature([Note]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
