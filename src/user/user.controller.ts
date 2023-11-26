import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonResponse } from 'src/lesson/lesson.response';
import { LessonService } from 'src/lesson/lesson.service';
import { LessonVideoResponse } from 'src/lesson/lessonvideo.response';
import { MyLessonResponse } from 'src/lesson/mylesson.response';
import { NoteService } from 'src/note/note.service';
import { TakeLessonQuiz } from 'src/quiz/dto/take-lesson-quiz.dto';
import { Quizesponse } from 'src/quiz/quiz.response';
import { QuizService } from 'src/quiz/quiz.service';
import { TakeQuizesponse } from 'src/quiz/take-quiz.response';
import { AddLessonPayload } from './dto/add-lesson.dto';
import { UserLesson } from './entity/user.lesson.entity';
import { Reportresponse } from './report.response';

@Controller('user')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly noteService: NoteService,
    private readonly quizeService: QuizService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/myLessons')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Array<UserLesson> })
  async getUser(@Req() req, @Res() res): Promise<UserLesson[]> {
    const lessons = await this.lessonService.myLessons(req.user);
    return res.status(200).json({ data: lessons });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/report')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Array<UserLesson> })
  async getUserReport(@Req() req, @Res() res): Promise<UserLesson[]> {
    const numberOfLessonTaken = await this.lessonService.numberOfLessonTaken(
      req.user.id,
    );
    const numberOfQuizTaken = await this.quizeService.numberOfQuizeTaken(
      req.user.id,
    );

    const numberOfNoteTaken = await this.noteService.numberOfNoteTaken(
      req.user.id,
    );

    const report: Reportresponse = {
      numberOfLessonTaken,
      numberOfQuizTaken,
      numberOfNoteTaken,
    };
    return res.status(200).json({ data: report });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/myLessons/:lessonId')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Array<MyLessonResponse> })
  async getUserLesson(
    @Req() req,
    @Param('lessonId') lessonId: string,
    @Res() res,
  ): Promise<MyLessonResponse> {
    const mylesson = await this.lessonService.myLessonandNotes(
      req.user,
      lessonId,
    );
    const lesson = await this.lessonService.getLessonById(mylesson.lessonId);
    const notes = await this.noteService.getLessonNotes(lesson.id, req.user.id);
    const data: MyLessonResponse = { lesson, notes };

    return res.status(200).json({ data });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/myLessons/takenquiz/:lessonId')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Array<TakeQuizesponse> })
  async getUserLessonQuizTaken(
    @Req() req,
    @Param('lessonId') lessonId: string,
    @Res() res,
  ): Promise<MyLessonResponse[]> {
    const mylesson = await this.lessonService.myLessonandNotes(
      req.user,
      lessonId,
    );
    const lesson = await this.lessonService.getLessonById(mylesson.lessonId);

    const quizTaken = await this.quizeService.getMyLessonQuizTaken(
      req.user,
      lesson.id,
    );

    return res.status(200).json({ quizTaken });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/myLessons/quiz/:lessonId')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Array<MyLessonResponse> })
  async getUserLessonQuiz(
    @Req() req,
    @Param('lessonId') lessonId: string,
    @Res() res,
  ): Promise<Quizesponse[]> {
    const mylesson = await this.lessonService.myLessonandNotes(
      req.user,
      lessonId,
    );
    const lesson = await this.lessonService.getLessonById(mylesson.lessonId);
    const lessonQuiz = await this.quizeService.getLessonQuizze(lesson.id);

    return res.status(200).json({ data: lessonQuiz });
  }

  @Post('take-lesson')
  @ApiResponse({
    status: 201,
    description: 'Successful',
    type: LessonResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: LessonResponse })
  async TakeLesson(
    @Body() payload: AddLessonPayload,
    @Req() req,
    @Res() res,
  ): Promise<LessonVideoResponse> {
    await this.lessonService.getLessonById(payload.lessonId);
    await this.lessonService.myLessonExist(req.user, payload.lessonId);
    const addLessonVideo = await this.lessonService.addUserLesson(
      req.user,
      payload,
    );
    return res.status(201).json({ data: addLessonVideo });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('take-lesson-quiz')
  @ApiResponse({
    status: 201,
    description: 'Successful Lesson Created',
    type: LessonResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: TakeQuizesponse })
  async TakeLessonQuize(
    @Body() payload: TakeLessonQuiz,
    @Req() req,
    @Res() res,
  ): Promise<TakeQuizesponse> {
    await this.lessonService.getLessonById(payload.lessonId);
    const lesson = await this.lessonService.myLessonExist(
      req.user,
      payload.lessonId,
    );
    const quiz = await this.quizeService.getQuiz(payload.quizId);

    await this.quizeService.getLessonQuizById(quiz.id, lesson.lessonId);
    const takeLessonQuiz = await this.quizeService.takeLessonQuiz(
      req.user,
      payload,
    );
    return res.status(201).json({ data: takeLessonQuiz });
  }
}
