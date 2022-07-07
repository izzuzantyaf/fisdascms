import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { DataServiceModule } from '../../database/data-service.module';
import { ScheduleFactoryService } from './schedule-factory.service';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService, ScheduleFactoryService],
  imports: [DataServiceModule],
  controllers: [ScheduleController],
  exports: [ScheduleService, ScheduleFactoryService],
})
export class ScheduleModule {}
