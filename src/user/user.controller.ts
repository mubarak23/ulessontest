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
import { AddLessonPayload } from './dto/add-lesson.dto';
import { UserLesson } from './entity/user.lesson.entity';

@Controller('user')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly noteService: NoteService,
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

  @Post('take-lesson')
  @ApiResponse({
    status: 201,
    description: 'Successful Lesson Created',
    type: LessonResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: LessonResponse })
  async AddLessonVideo(
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
}
