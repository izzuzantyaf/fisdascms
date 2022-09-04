import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';

describe('Application (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/admin (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/admin')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'helloworld',
        role: 'admin',
      });
    expect(response.statusCode).toEqual(201);
  });

  it('/api/admin (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/admin');
    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    app.close();
  });
});
