import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { GetUser } from 'src/users/getUser.decorator';
import { User } from 'src/users/user.entity';
import { Note } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getAllUserNotes(@GetUser() user: User): Promise<Note[]> {
    return this.notesService.getUserNotes(user);
  }

  @Post()
  createNote(
    @GetUser() user: User,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    return this.notesService.createNote(user, createNoteDto);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string, @GetUser() user: User): Promise<Note[]> {
    return this.notesService.deleteNote(user, id);
  }
}
