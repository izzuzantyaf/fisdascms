import { Test, TestingModule } from '@nestjs/testing';
import { HandoutController } from '../handout.controller';
import { HandoutModule } from '../handout.module';

describe('HandoutController', () => {
  let controller: HandoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HandoutModule],
    }).compile();

    controller = module.get(HandoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
