import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleModule } from './schedule.module';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule],
    }).compile();

    service = module.get(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
