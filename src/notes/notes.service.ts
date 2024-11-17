import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Note } from './notes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}
  async getUserNotes(user: User): Promise<Note[]> {
    const query = this.noteRepository.createQueryBuilder('note');
    query.where({ user });
    return await query.getMany();
  }

  async createNote(user: User, noteDto: CreateNoteDto): Promise<Note> {
    const { title, description } = noteDto;
    const newNote = this.noteRepository.create({
      title,
      description,
      user,
    });
    return await this.noteRepository.save(newNote);
  }
  async updateNote(
    id: string,
    noteDto: UpdateNoteDto,
    user: User,
  ): Promise<Note> {
    const { title, description } = noteDto;
    const noteToUpdate = await this.getNoteById(id, user);
    if (title) noteToUpdate.title = title;
    if (description) noteToUpdate.description = description;

    await this.noteRepository.save(noteToUpdate);
    return noteToUpdate;
  }

  async deleteNote(user: User, id: string): Promise<Note[]> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    const query = this.noteRepository.createQueryBuilder('note');
    query.where({ user });
    return await query.getMany();
  }

  async getNoteById(id: string, user: User): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id, user });
    if (!note) throw new NotFoundException(`Note with ID "${id}" not found`);
    return note;
  }
}
