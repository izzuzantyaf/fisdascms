import { Test, TestingModule } from '@nestjs/testing';
import { PracticumModuleController } from './practicum-module.controller';

describe('PracticumModuleController', () => {
  let controller: PracticumModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticumModuleController],
    }).compile();

    controller = module.get<PracticumModuleController>(PracticumModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
