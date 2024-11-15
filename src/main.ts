import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { signUpValidator } from './pipes/validator.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(signUpValidator);
  await app.listen(3000);
}
bootstrap();
