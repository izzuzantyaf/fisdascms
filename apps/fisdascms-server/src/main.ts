import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';

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
  app.useGlobalInterceptors(new ResponseInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Fisdas CMS OpenAPI')
    .setDescription('Dokumentasi API Fisdas CMS')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const DEFAULT_PORT = 8080;
  const logger = new Logger('NestApplication');
  await app.listen(process.env.PORT ?? DEFAULT_PORT).then(() => {
    logger.log(
      `Application started in port ${process.env.PORT ?? DEFAULT_PORT}`,
    );
  });
}
bootstrap();
