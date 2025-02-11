import { Note } from 'src/notes/notes.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('unique_email_constraint', ['email'])
@Unique('unique_username_constraint', ['userName'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => Note, (note) => note.user, { eager: true })
  notes: Note[];
}
