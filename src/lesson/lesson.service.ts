import {
  Injectable,
  NotAcceptableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddLessonPayload } from 'src/user/dto/add-lesson.dto';
import { User } from 'src/user/entity/user.entity';
import { UserLesson } from 'src/user/entity/user.lesson.entity';
import { Repository } from 'typeorm';
import { AddLesson } from './dto/add-lesson.dto';
import { AddVideoLesson } from './dto/add-video-lesson.dto';
import { Lesson } from './entity/lesson.entity';
import { LessonVideo } from './entity/lesson.video.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    @InjectRepository(LessonVideo)
    private readonly lessonVideoRepository: Repository<LessonVideo>,

    @InjectRepository(UserLesson)
    private readonly userlessonRepository: Repository<UserLesson>,
  ) {}

  async createLesson(payload: AddLesson): Promise<Lesson> {
    const lessonExist = await this.getLessonByName(payload.name);

    if (lessonExist) {
      throw new NotAcceptableException(
        'User with provided details already created.',
      );
    }
    const newLesson = await this.lessonRepository.save({
      ...payload,
    });
    return newLesson;
  }

  async addUserLesson(user: User, payload: AddLessonPayload): Promise<Lesson> {
    const lessonExist = await this.getLessonById(payload.lessonId);
    await this.userlessonRepository.save({
      lessonId: lessonExist.id,
      userId: user.id,
    });
    return lessonExist;
  }

  async myLessonExist(user: User, lessonId: string): Promise<UserLesson> {
    const userlesson = await this.userlessonRepository.findOne({
      where: { userId: user.id, lessonId },
    });
    if (!userlesson) {
      throw new UnprocessableEntityException('Lesson Not Assign by user');
    }

    return userlesson;
  }

  async myLessons(user: User): Promise<UserLesson[]> {
    const lessons = await this.userlessonRepository.find({
      where: { userId: user.id },
      relations: ['lessons'],
    });
    return lessons;
  }

  // myLessonandNote
  async myLessonandNotes(user: User, lessonId: string): Promise<UserLesson> {
    const lessons = await this.userlessonRepository.findOne({
      where: { userId: user.id, lessonId },
      relations: ['lessons'],
    });
    return lessons;
  }

  async addLessonVideo(payload: AddVideoLesson): Promise<LessonVideo> {
    const VideolessonExist = await this.getLessonVideoByName(payload.name);

    if (VideolessonExist) {
      await this.lessonVideoRepository.update(
        {
          id: VideolessonExist.id,
        },
        { ...payload },
      );
    }
    const newLessonVideo = await this.lessonVideoRepository.save({
      ...payload,
    });
    return newLessonVideo;
  }

  async getLessonByName(name: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({ where: { name } });
  }

  async getLessonVideoByName(name: string): Promise<LessonVideo> {
    return await this.lessonVideoRepository.findOne({ where: { name } });
  }

  async getLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['videos', 'quizes'],
    });

    if (!lesson) {
      throw new NotAcceptableException('Lesson Does Not Exist');
    }

    return lesson;
  }

  async getLessonVideoById(id: string): Promise<LessonVideo> {
    const lesson = await this.lessonVideoRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotAcceptableException('Lesson Video Does Not Exist.');
    }

    return lesson;
  }

  async getLessonVideoByLessonId(lessonId: string): Promise<LessonVideo[]> {
    const lessonVideos = await this.lessonVideoRepository.find({
      where: { lessonId },
    });

    return lessonVideos;
  }

  async getLessons(): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.find();

    return lessons;
  }
}
