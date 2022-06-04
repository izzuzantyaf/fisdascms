import { Test, TestingModule } from '@nestjs/testing';
import { PracticumModuleController } from './practicum-module.controller';
import { PracticumModuleModule } from './practicum-module.module';

describe('PracticumModuleController', () => {
  let controller: PracticumModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PracticumModuleModule],
    }).compile();

    controller = module.get<PracticumModuleController>(
      PracticumModuleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
