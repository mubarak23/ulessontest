import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonService } from 'src/lesson/lesson.service';
import { CreateLessonQuiz } from './dto/create-quiz.dto';
import { Quizesponse } from './quiz.response';
import { QuizService } from './quiz.service';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly lessonService: LessonService,
  ) {}

  @ApiResponse({ status: 200, description: '', type: Quizesponse })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Quizesponse })
  @Get('/')
  async getQuizze(@Req() req, @Res() res): Promise<Quizesponse> {
    const quiz = await this.quizService.getQuizze();
    return res.status(200).json({ data: quiz });
  }

  @ApiResponse({ status: 200, description: '', type: Quizesponse })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Quizesponse })
  @Get('/:id')
  async findOneQuiz(
    @Req() req,
    @Res() res,
    @Param('id') id: string,
  ): Promise<Quizesponse> {
    const quiz = await this.quizService.getQuiz(id);
    return res.status(200).json({ data: quiz });
  }

  @Post('add')
  @ApiResponse({
    status: 201,
    description: 'Successful Add Lesson Quiz',
    type: Quizesponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Quizesponse })
  async addQuiz(
    @Body() payload: CreateLessonQuiz,
    @Req() req,
    @Res() res,
  ): Promise<Quizesponse> {
    await this.lessonService.getLessonById(payload.lessonId);
    const addLessonQuiz = await this.quizService.createLessonQuiz(payload);
    return res.status(201).json({ data: addLessonQuiz });
  }

  @Patch('/:id')
  @ApiResponse({
    status: 201,
    description: 'Successful Add Lesson Note',
    type: Quizesponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Quizesponse })
  async updateQuiz(
    @Body() payload: CreateLessonQuiz,
    @Req() req,
    @Param('id') id: string,
    @Res() res,
  ): Promise<Quizesponse> {
    await this.quizService.getQuiz(id);
    await this.lessonService.getLessonById(payload.lessonId);
    const addLessonQuiz = await this.quizService.createLessonQuiz(payload);
    return res.status(200).json({ data: addLessonQuiz });
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete  Note',
    type: Boolean,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Boolean })
  async deleteQuiz(
    @Req() req,
    @Param('id') id: string,
    @Res() res,
  ): Promise<boolean> {
    const quiz = await this.quizService.getQuiz(id);
    await this.quizService.deleteQuiz(quiz.id);
    return res.status(200).json({ data: true });
  }
}
