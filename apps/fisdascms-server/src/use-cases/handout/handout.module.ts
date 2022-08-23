import { Module } from '@nestjs/common';
import { HandoutController } from './handout.controller';
import { HandoutFactoryService } from './handout-factory.service';
import { HandoutService } from './handout.service';

@Module({
  providers: [HandoutService, HandoutFactoryService],
  controllers: [HandoutController],
  exports: [HandoutService, HandoutFactoryService],
})
export class HandoutModule {}
