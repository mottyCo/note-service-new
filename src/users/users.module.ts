import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FakeDbModule } from 'src/fake_db/fake_db.module';
import { FakeDB } from 'src/fake_db/fake.db';
import { FakeDbService } from 'src/fake_db/fake_db.service';

@Module({
  imports: [FakeDbModule],
  controllers: [UsersController],
  providers: [UsersService, FakeDB, FakeDbService],
})
export class UsersModule {}
