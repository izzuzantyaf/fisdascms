import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true, // menampilkan pesan pada console jika terjadi error,
    }),
  );
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
