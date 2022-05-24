import { Test, TestingModule } from '@nestjs/testing';
import { AssistantModule } from './assistant.module';
import { AssistantService } from './assistant.service';

describe('AssistantService', () => {
  let service: AssistantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AssistantModule],
    }).compile();

    service = module.get(AssistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
