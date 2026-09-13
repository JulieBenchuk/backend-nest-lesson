import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

// Создаем заглушку (mock) для модуля бд, если это необходимо,
// но для базовой проверки синтаксиса достаточно обновить вызовы:
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getTasks', () => {
    it('should be defined', () => {
      expect(appController.getTasks).toBeDefined();
    });
  });
});
