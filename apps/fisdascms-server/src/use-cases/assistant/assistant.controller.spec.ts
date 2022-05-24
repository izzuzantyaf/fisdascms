import { Test, TestingModule } from '@nestjs/testing';
import { AssistantController } from './assistant.controller';

describe('AssistantController', () => {
  let controller: AssistantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistantController],
    }).compile();

    controller = module.get<AssistantController>(AssistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
