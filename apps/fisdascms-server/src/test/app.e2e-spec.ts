import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';

describe('AdminController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/admin (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/admin');
    expect(response.statusCode).toBe(200);
  });
});
