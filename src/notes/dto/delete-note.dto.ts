import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteNoteDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
