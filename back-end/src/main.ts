import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Cambia este valor si tu frontend está en otro puerto o dominio
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  // Configuración de ValidationPipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    validationError: {
      target: false,
      value: false,
    },
  }));

  await app.listen(3000);
}

bootstrap();
