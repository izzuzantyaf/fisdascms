import { Module } from '@nestjs/common';
import { ScheduleController } from 'src/controllers/schedule/schedule.controller';
import { DataServicesModule } from '../data-services/data-services.module';
import { ScheduleFactoryService } from './schedule-factory.service';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService, ScheduleFactoryService],
  imports: [DataServicesModule],
  controllers: [ScheduleController],
  exports: [ScheduleService, ScheduleFactoryService],
})
export class ScheduleModule {}
