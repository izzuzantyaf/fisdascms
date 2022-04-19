import { Test, TestingModule } from '@nestjs/testing';
import { HandoutController } from './handout.controller';

describe('HandoutController', () => {
  let controller: HandoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandoutController],
    }).compile();

    controller = module.get<HandoutController>(HandoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
