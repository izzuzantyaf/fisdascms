import { Test, TestingModule } from '@nestjs/testing';
import { AssistantController } from './assistant.controller';
import { AssistantModule } from './assistant.module';

describe('AssistantController', () => {
  let controller: AssistantController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AssistantModule],
    }).compile();

    controller = module.get(AssistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
