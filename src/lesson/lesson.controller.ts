import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddLesson } from './dto/add-lesson.dto';
import { AddVideoLesson } from './dto/add-video-lesson.dto';
import { Lesson } from './entity/lesson.entity';
import { LessonResponse } from './lesson.response';
import { LessonService } from './lesson.service';
import { LessonVideoResponse } from './lessonvideo.response';

@Controller('lesson')
@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Array<Lesson> })
  async getUser(@Req() req, @Res() res): Promise<Lesson[]> {
    const lessons = await this.lessonService.getLessons();
    return res.status(200).json({ data: lessons });
  }

  @ApiResponse({ status: 200, description: '', type: Lesson })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Lesson })
  @Get('/:lessonId')
  async findOneLesson(
    @Req() req,
    @Res() res,
    @Param('lessonId') lessonId: string,
  ): Promise<Lesson> {
    const lesson = await this.lessonService.getLessonById(lessonId);

    return res.status(200).json({ data: lesson });
  }

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Successful Lesson Created',
    type: LessonResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: LessonResponse })
  async add(
    @Body() payload: AddLesson,
    @Req() req,
    @Res() res,
  ): Promise<LessonResponse> {
    const addLesson = await this.lessonService.createLesson(payload);
    return res.status(201).json({ data: addLesson });
  }

  @Post('add-video')
  @ApiResponse({
    status: 201,
    description: 'Successful Lesson Created',
    type: LessonResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: LessonVideoResponse })
  async AddLessonVideo(
    @Body() payload: AddVideoLesson,
    @Req() req,
    @Res() res,
  ): Promise<LessonVideoResponse> {
    const addLessonVideo = await this.lessonService.addLessonVideo(payload);
    return res.status(201).json({ data: addLessonVideo });
  }
}
