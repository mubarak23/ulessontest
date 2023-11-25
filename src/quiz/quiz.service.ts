import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateLessonQuiz } from './dto/create-quiz.dto';
import { TakeLessonQuiz } from './dto/take-lesson-quiz.dto';
import { Quiz } from './entity/quiz.entity';
import { UserQuiz } from './entity/user-quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>,
  ) {}

  async createLessonQuiz(payload: CreateLessonQuiz): Promise<Quiz> {
    const lessonQuizExist = await this.quizRepository.findOne({
      where: { question: payload.question, lessonId: payload.lessonId },
    });

    if (lessonQuizExist) {
      // update
      await this.quizRepository.update(
        { id: lessonQuizExist.id },
        {
          ...payload,
        },
      );
      return lessonQuizExist;
    }
    const newLessonQuiz = await this.quizRepository.save({
      ...payload,
    });
    return newLessonQuiz;
  }

  async getQuiz(id: string): Promise<Quiz> {
    const lessonQuizExist = await this.quizRepository.findOne({
      where: { id },
    });
    if (!lessonQuizExist) {
      throw new UnprocessableEntityException('Quiz Does Not Exist');
    }
    return lessonQuizExist;
  }

  async getLessonQuizze(lessonId: string): Promise<Quiz[]> {
    const lessonQuizs = await this.quizRepository.find({
      where: { lessonId },
    });
    return lessonQuizs;
  }

  async getQuizze(): Promise<Quiz[]> {
    const lessonQuizs = await this.quizRepository.find();
    return lessonQuizs;
  }

  async getLessonQuiz(id: string, lessonId: string): Promise<Quiz> {
    const lessonQuiz = await this.quizRepository.findOne({
      where: { id, lessonId },
    });
    if (!lessonQuiz) {
      throw new UnprocessableEntityException('Lesson Quize Does Not Exist');
    }
    return lessonQuiz;
  }

  async deleteQuiz(id: string): Promise<boolean> {
    await this.quizRepository.delete({
      id,
    });

    return true;
  }

  async userHasTakenQuiz(
    user: User,
    lessonId: string,
    quizId: string,
  ): Promise<boolean> {
    const quizTaken = await this.userQuizRepository.findOne({
      where: { lessonId, userId: user.id, quizId },
    });
    if (quizTaken) {
      throw new UnprocessableEntityException(
        'User Has Taken the lesson Quiz Question',
      );
    }
    return true;
  }

  async takeLessonQuiz(user: User, payload: TakeLessonQuiz): Promise<UserQuiz> {
    const quize = await this.getLessonQuiz(payload.quizId, payload.lessonId);
    let isPass = false;
    if (quize.correctOption === payload.optionSelected) {
      isPass = true;
    }
    await this.userHasTakenQuiz(user, quize.lessonId, quize.id);

    const takeQuiz = await this.userQuizRepository.save({
      userId: user.id,
      lessonId: quize.lessonId,
      quizId: quize.id,
      optionSelected: payload.optionSelected,
      isPass,
    });
    return takeQuiz;
  }

  async getMyLessonQuizTaken(
    user: User,
    lessonId: string,
  ): Promise<UserQuiz[]> {
    const lessonQuizTaken = await this.userQuizRepository.find({
      where: { userId: user.id, lessonId },
    });
    return lessonQuizTaken;
  }
}

// list of service
// create
// edit
// view one
// delete
// view all lesson quiz
// takq quze
// fetch all lesson quiz taken
