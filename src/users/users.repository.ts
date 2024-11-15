import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dto/signUp.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto): Promise<void> {
    const { firstName, lastName, userName, email, password } = signUpDto;
    const user = this.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });
    await this.save(user);
  }
}
