import { Test, TestingModule } from '@nestjs/testing';
import { PracticumModuleModule } from './practicum-module.module';
import { PracticumModuleService } from './practicum-module.service';

describe('PracticumModuleService', () => {
  let service: PracticumModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PracticumModuleModule],
    }).compile();

    service = module.get(PracticumModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
