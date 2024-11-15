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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): IUser[] {
    return this.usersService.getAllUsers();
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
