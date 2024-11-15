import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LogInDto {
  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'userName must includes 4 charactors at least' })
  @MaxLength(10, {
    message: 'userName must includes up to 10 charactors at least',
  })
  userName?: string;

  @IsNotEmpty({ message: 'password cant stay empty' })
  @IsString()
  @MinLength(8, { message: 'password must includes 8 charactors at least' })
  @MaxLength(20, {
    message: 'password must includes up to 20 charactors at least',
  })
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
