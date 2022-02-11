import { NestFactory } from '@nestjs/core';
import { errors } from 'celebrate';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(errors());
  await app.listen(3000);
}
bootstrap();
