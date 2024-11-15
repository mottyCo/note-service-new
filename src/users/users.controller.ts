import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from 'src/models/user.model';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import { ValidationError } from 'class-validator';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    const users = this.usersService.getAllUsers();
    return users;
  }

  @Post('signup')
  signUP(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.usersService.signUp(signUpDto);
  }

  @Post('login')
  logIn(@Body() logInDto: LogInDto): Promise<{ token: string }> {
    return this.usersService.logIn(logInDto);
  }
}
