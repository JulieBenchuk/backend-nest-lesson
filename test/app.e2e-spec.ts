import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
        .get('/tasks')
        .expect(200)
        .expect((res) => {
          // Проверяем структуру и наполнение ответа
          expect(res.body).toEqual([
            { id: 1, title: 'Learn Docker', done: true },
            { id: 2, title: 'Learn Compose', done: true },
            { id: 3, title: 'Learn networks', done: false }
          ]);
        });
  });

  afterEach(async () => {
    await app.close();
  });
});
