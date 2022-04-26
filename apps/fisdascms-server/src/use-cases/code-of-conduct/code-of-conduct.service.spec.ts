import { Test, TestingModule } from '@nestjs/testing';
import { CodeOfConductService } from './code-of-conduct.service';

describe('CodeOfConductService', () => {
  let service: CodeOfConductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeOfConductService],
    }).compile();

    service = module.get<CodeOfConductService>(CodeOfConductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
