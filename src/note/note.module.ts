import { Module } from '@nestjs/common';
import { Note } from './entity/note.entity';
import { NoteService } from './note.service';

@Module({
  imports: [Note],
  providers: [NoteService],
})
export class NoteModule {}
