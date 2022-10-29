import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: process.env.NODE_ENV === 'production' ? ['log'] : ['debug'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true, // menampilkan pesan pada console jika terjadi error,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Fisdas CMS OpenAPI')
    .setDescription('Dokumentasi API Fisdas CMS')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
