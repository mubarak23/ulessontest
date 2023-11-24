import { ApiProperty } from '@nestjs/swagger';
import { Note } from './entity/note.entity';

export class NoteResponse {
  @ApiProperty()
  note: Note;
}
