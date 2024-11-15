import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { firstName, lastName, userName, email, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
      const payload: JwtPayload = { userName };
      const token: string = await this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        // PostgreSQL unique violation error code
        const detail = error.detail as string;

        if (detail.includes('email')) {
          throw new ConflictException(
            'The email address is already in use. Please choose a different email.',
          );
        } else if (detail.includes('userName')) {
          throw new ConflictException(
            'The username is already taken. Please choose a different username.',
          );
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async logIn(logInDto: LogInDto): Promise<{ token: string }> {
    const { userName, email, password } = logInDto;
    let user!: User;
    if (userName) {
      user = await this.userRepository.findOne({ where: { userName } });
    } else if (email) {
      user = await this.userRepository.findOne({ where: { email } });
    } else {
      throw new BadRequestException('mast include user name or email');
    }
    if (!user) {
      throw new NotFoundException('user not exist');
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { userName };
      const token: string = await this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('password incorrect');
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
