import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FakeDbModule } from './fake_db/fake_db.module';

@Module({
  imports: [UsersModule, FakeDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
