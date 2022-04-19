import { Module } from '@nestjs/common';
import { HandoutController } from 'src/controllers/handout/handout.controller';
import { DataServicesModule } from '../data-services/data-services.module';
import { HandoutFactoryService } from './handout-factory.service';
import { HandoutService } from './handout.service';

@Module({
  imports: [DataServicesModule],
  providers: [HandoutService, HandoutFactoryService],
  controllers: [HandoutController],
  exports: [HandoutService, HandoutFactoryService],
})
export class HandoutModule {}
