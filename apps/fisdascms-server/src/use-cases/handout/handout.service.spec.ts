import { Test, TestingModule } from '@nestjs/testing';
import { HandoutService } from './handout.service';

describe('HandoutService', () => {
  let service: HandoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandoutService],
    }).compile();

    service = module.get<HandoutService>(HandoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
