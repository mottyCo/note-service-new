import { Injectable } from '@nestjs/common';
import { IUser } from 'src/models/user.model';

@Injectable()
export class FakeDB {
  public users: IUser[] = [];
}
