import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleFactoryService } from './schedule-factory.service';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService, ScheduleFactoryService],
  controllers: [ScheduleController],
  exports: [ScheduleService, ScheduleFactoryService],
})
export class ScheduleModule {}
