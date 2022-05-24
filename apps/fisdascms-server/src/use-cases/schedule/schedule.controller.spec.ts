import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleModule } from './schedule.module';

describe('ScheduleController', () => {
  let controller: ScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule],
    }).compile();

    controller = module.get(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
