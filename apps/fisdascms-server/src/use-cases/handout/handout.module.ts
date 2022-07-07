import { Module } from '@nestjs/common';
import { HandoutController } from './handout.controller';
import { DataServiceModule } from '../../database/data-service.module';
import { HandoutFactoryService } from './handout-factory.service';
import { HandoutService } from './handout.service';

@Module({
  imports: [DataServiceModule],
  providers: [HandoutService, HandoutFactoryService],
  controllers: [HandoutController],
  exports: [HandoutService, HandoutFactoryService],
})
export class HandoutModule {}
