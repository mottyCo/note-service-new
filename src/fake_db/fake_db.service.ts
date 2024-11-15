import { IUser } from 'src/models/user.model';
import { FakeDB } from './fake.db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeDbService {
  constructor(private fakeDb: FakeDB) {}
  isUserNameExist = (userName: string): boolean => {
    let findUser: boolean = false;
    this.fakeDb.users.forEach((user) => {
      if (user.userName === userName) {
        findUser = true;
      }
    });

    return findUser;
  };
  isEmailExist = (email: string): boolean => {
    let findUser: boolean = false;
    this.fakeDb.users.forEach((user) => {
      if (user.email === email) {
        findUser = true;
      }
    });
    return findUser;
  };
  addUserToDb(user: IUser) {
    this.fakeDb.users.push(user);
  }
  getUsers(): IUser[] {
    return this.fakeDb.users;
  }
  getUserByUserName(userName: string): IUser {
    let userToReturn!: IUser;
    this.fakeDb.users.map((user) => {
      if (user.userName === userName) {
        userToReturn = user;
      }
    });
    if (userToReturn) return userToReturn;
    throw new Error(`username : ${userName} not exist`);
  }
  getUserByEmail(email: string): IUser {
    let userToReturn!: IUser;
    this.fakeDb.users.map((user) => {
      if (user.email === email) {
        userToReturn = user;
      }
    });
    if (userToReturn) return userToReturn;
    throw new Error(`email : ${email} not exist`);
  }
}
