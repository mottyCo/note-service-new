import { Module } from '@nestjs/common';
import { FakeDbService } from './fake_db.service';
import { FakeDB } from './fake.db';

@Module({
  providers: [FakeDbService, FakeDB],
})
export class FakeDbModule {}
