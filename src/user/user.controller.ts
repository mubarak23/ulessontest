import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonResponse } from 'src/lesson/lesson.response';
import { LessonService } from 'src/lesson/lesson.service';
import { LessonVideoResponse } from 'src/lesson/lessonvideo.response';
import { AddLessonPayload } from './dto/add-lesson.dto';

@Controller('user')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('add-video')
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
    console.log('req.user,', req.user);
    const addLessonVideo = await this.lessonService.addUserLesson(
      req.user,
      payload,
    );
    return res.status(201).json({ data: addLessonVideo });
  }
}
