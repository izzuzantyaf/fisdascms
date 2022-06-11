import { Test, TestingModule } from '@nestjs/testing';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';
import { PracticumModuleController } from './practicum-module.controller';
import { PracticumModuleModule } from './practicum-module.module';

describe('PracticumModuleController', () => {
  let controller: PracticumModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PracticumModuleModule],
    }).compile();

    controller = module.get(PracticumModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it('harus mengembalikan object bertipe SuccessfulResponse', async () => {
      expect(await controller.getAll()).toBeInstanceOf(SuccessfulResponse);
    });
  });
});
