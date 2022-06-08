import { Test, TestingModule } from '@nestjs/testing';
import { AssistantModule } from './assistant.module';
import { AssistantService } from './assistant.service';

describe('AssistantService', () => {
  let service: AssistantService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AssistantModule],
    }).compile();

    service = module.get(AssistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
