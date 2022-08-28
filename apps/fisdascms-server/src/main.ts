import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true, // menampilkan pesan pada console jika terjadi error,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Fisdas CMS API')
    .setVersion('1.0')
    .addTag('admin')
    .addTag('auth')
    .addTag('assistant')
    .addTag('code of conduct')
    .addTag('handout')
    .addTag('organigram')
    .addTag('practicum material')
    .addTag('schedule')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
