import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'https://crisjs.vercel.app',
      'https://criscrm.vercel.app',
      'https://criscms.vercel.app',
      'https://terrakota.vercel.app',
      'https://regalosterrakota.vercel.app',
      'http://localhost:3001',
      'http://localhost:6001',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();
