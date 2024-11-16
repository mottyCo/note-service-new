import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes.entity';
import { UsersModule } from 'src/users/users.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), UsersModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
