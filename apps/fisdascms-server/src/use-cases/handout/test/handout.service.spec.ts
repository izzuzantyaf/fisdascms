import { Test, TestingModule } from '@nestjs/testing';
import { HandoutModule } from '../handout.module';
import { HandoutService } from '../handout.service';

describe('HandoutService', () => {
  let service: HandoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HandoutModule],
    }).compile();

    service = module.get(HandoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
