import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Note } from './notes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';

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

  async deleteNote(user: User, id: string): Promise<Note[]> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    const query = this.noteRepository.createQueryBuilder('note');
    query.where({ user });
    return await query.getMany();
  }
}
