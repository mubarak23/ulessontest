import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AddLessonNote } from './dto/add-note.dto';
import { Note } from './entity/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async addLessonVideoNote(user: User, payload: AddLessonNote): Promise<Note> {
    const VideolessonNoteExist = await this.getLessonVideoNoteByContent(
      payload.content,
      payload.videotime,
      user.id,
    );

    if (VideolessonNoteExist) {
      await this.noteRepository.update(
        {
          id: VideolessonNoteExist.id,
        },
        { ...payload, userId: user.id },
      );
    }
    const newLessonVideo = await this.noteRepository.save({
      userId: user.id,
      ...payload,
    });
    return newLessonVideo;
  }

  async getLessonVideoNoteByContent(
    content: string,
    videotime: string,
    userId: string,
  ): Promise<Note> {
    return await this.noteRepository.findOne({
      where: { userId, content, videotime },
    });
  }

  async getLessonNotes(lessonId: string, userId: string): Promise<Note[]> {
    return await this.noteRepository.find({
      where: { userId, lessonId },
    });
  }

  async getNotes(userId: string): Promise<Note[]> {
    return await this.noteRepository.find({
      where: { userId: userId },
    });
  }

  async getNoteById(userId: string, id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: id, userId: userId },
      relations: ['lesson'],
    });
    if (!note) {
      throw new UnprocessableEntityException('Note Does Not Exist');
    }
    return note;
  }

  async deleteNoteById(userId: string, id: string): Promise<boolean> {
    await this.noteRepository.delete({ id, userId });
    return true;
  }

  async updateNoteById(
    userId: string,
    id: string,
    content: string,
  ): Promise<boolean> {
    await this.noteRepository.update(
      { id, userId },
      {
        content: content,
      },
    );
    return true;
  }

  async numberOfNoteTaken(userId: string): Promise<any> {
    const notes = await this.noteRepository.find({
      where: { userId },
    });
    if (notes) {
      return notes.length;
    }
  }

  async getLessonNoteById(id: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id, userId },
    });
    if (!note) {
      throw new UnprocessableEntityException('Note Does Not Exist');
    }
    return note;
  }
}
