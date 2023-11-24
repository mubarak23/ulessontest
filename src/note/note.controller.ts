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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonService } from 'src/lesson/lesson.service';
import { AddLessonNote } from './dto/add-note.dto';
import { EditLessonNote } from './dto/edit-note.dto';
import { NoteResponse } from './note.response';
import { NoteService } from './note.service';

@Controller('note')
@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly noteService: NoteService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: Array<NoteResponse> })
  async getnotes(@Req() req, @Res() res): Promise<NoteResponse[]> {
    const notes = await this.noteService.getNotes(req.user.id);
    return res.status(200).json({ data: notes });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: NoteResponse })
  async getUser(
    @Req() req,
    @Param('id') id: string,
    @Res() res,
  ): Promise<NoteResponse> {
    const note = await this.noteService.getNoteById(req.user.id, id);
    return res.status(200).json({ data: note });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('add')
  @ApiResponse({
    status: 201,
    description: 'Successful Add Lesson Note',
    type: NoteResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: NoteResponse })
  async addNote(
    @Body() payload: AddLessonNote,
    @Req() req,
    @Res() res,
  ): Promise<NoteResponse> {
    await this.lessonService.getLessonById(payload.lessonId);

    await this.lessonService.getLessonVideoById(payload.lessonvideoId);

    await this.lessonService.myLessonExist(req.user, payload.lessonId);

    const lessonNoteTaken = await this.noteService.addLessonVideoNote(
      req.user,
      payload,
    );
    return res.status(201).json({ data: lessonNoteTaken });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('/:id')
  @ApiResponse({
    status: 201,
    description: 'Delete  Note',
    type: NoteResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: NoteResponse })
  async deleteNote(
    @Req() req,
    @Param('id') id: string,
    @Res() res,
  ): Promise<NoteResponse> {
    const note = await this.noteService.getNoteById(req.user.id, id);
    await this.noteService.deleteNoteById(req.user.id, note.id);
    return res.status(201).json({ data: true });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch('/:id')
  @ApiResponse({
    status: 201,
    description: 'Successful Add Lesson Note',
    type: NoteResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Session Expired' })
  @ApiResponse({ type: NoteResponse })
  async updateNote(
    @Body() payload: EditLessonNote,
    @Req() req,
    @Param('id') id: string,
    @Res() res,
  ): Promise<NoteResponse> {
    const note = await this.noteService.getNoteById(req.user.id, id);

    await this.noteService.updateNoteById(
      req.user.id,
      note.id,
      payload.content,
    );
    return res.status(201).json({ data: true });
  }
}
