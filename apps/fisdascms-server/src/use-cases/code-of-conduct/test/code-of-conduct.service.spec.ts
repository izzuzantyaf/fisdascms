import { Test, TestingModule } from '@nestjs/testing';
import { CodeOfConductModule } from '../code-of-conduct.module';
import { CodeOfConductService } from '../code-of-conduct.service';

describe('CodeOfConductService', () => {
  let service: CodeOfConductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodeOfConductModule],
    }).compile();

    service = module.get(CodeOfConductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
