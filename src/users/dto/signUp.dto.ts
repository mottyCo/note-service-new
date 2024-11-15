import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'first name cant stay empty' })
  @IsString()
  @MinLength(2, { message: 'first name must includes 2 charactors at least' })
  @MaxLength(18, {
    message: 'first name must includes up to 18 charactors at least',
  })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Only alphabetic characters are allowed (a-z, A-Z)',
  })
  firstName: string;

  @IsNotEmpty({ message: 'last name cant stay empty' })
  @IsString()
  @MinLength(2, { message: 'last name must includes 2 charactors at least' })
  @MaxLength(18, {
    message: 'last name must includes up to 18 charactors at least',
  })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Only alphabetic characters are allowed (a-z, A-Z)',
  })
  lastName: string;

  @IsNotEmpty({ message: 'userName cant stay empty' })
  @IsString()
  @MinLength(4, { message: 'userName must includes 4 charactors at least' })
  @MaxLength(10, {
    message: 'userName must includes up to 10 charactors at least',
  })
  userName: string;

  @IsNotEmpty({ message: 'password cant stay empty' })
  @IsString()
  @MinLength(8, { message: 'password must includes 8 charactors at least' })
  @MaxLength(20, {
    message: 'password must includes up to 20 charactors at least',
  })
  password: string;

  @IsNotEmpty({ message: 'email cant stay empty' })
  @IsEmail()
  email: string;
}
