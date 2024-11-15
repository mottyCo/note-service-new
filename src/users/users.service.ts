import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { FakeDbService } from 'src/fake_db/fake_db.service';
import { IUser } from 'src/models/user.model';
import { v4 as uuid } from 'uuid';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';

@Injectable()
export class UsersService {
  constructor(private fakeDbService: FakeDbService) {}
  signUp = (signUpDto: SignUpDto): Promise<{ token: string }> => {
    return new Promise((reslove, reject) => {
      if (this.fakeDbService.isUserNameExist(signUpDto.userName)) {
        throw new ConflictException('userName already taken');
      }
      if (this.fakeDbService.isEmailExist(signUpDto.email)) {
        throw new ConflictException('email already exist');
      }
      const newId = uuid();
      const newUser: IUser = {
        id: newId,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        userName: signUpDto.userName,
        email: signUpDto.email,
        password: signUpDto.password,
      };
      this.fakeDbService.addUserToDb(newUser);
      reslove({ token: uuid() });
    });
  };
  logIn = (logInDto: LogInDto): Promise<{ token: string }> => {
    return new Promise((resolve, reject) => {
      let user!: IUser;
      try {
        if (logInDto.userName) {
          console.log(this.fakeDbService.isUserNameExist(logInDto.userName));
          if (this.fakeDbService.isUserNameExist(logInDto.userName)) {
            console.log('here2');
            user = this.fakeDbService.getUserByUserName(logInDto.userName);
          } else {
            throw new Error(`user name ${logInDto.userName} not exist`);
          }
        } else if (logInDto.email) {
          if (this.fakeDbService.isEmailExist(logInDto.email)) {
            user = this.fakeDbService.getUserByEmail(logInDto.email);
          } else {
            throw new Error(`email ${logInDto.email} not exist`);
          }
        } else {
          throw new Error('mast include user name or email');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (this.isItUserPassword(user, logInDto.password)) {
        resolve({ token: uuid() });
      } else {
        throw new BadRequestException('incorrect password');
      }
    });
  };
  isItUserPassword(user: IUser, password: string): boolean {
    if (user.password === password) return true;
    return false;
  }
  getAllUsers(): IUser[] {
    return this.fakeDbService.getUsers();
  }
}
