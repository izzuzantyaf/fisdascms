import { Module } from '@nestjs/common';
import { AssistantController } from './assistant.controller';
import { AssistantFactoryService } from './assistant-factory.service';
import { AssistantService } from './assistant.service';

@Module({
  providers: [AssistantService, AssistantFactoryService],
  controllers: [AssistantController],
  exports: [AssistantService, AssistantFactoryService],
})
export class AssistantModule {}
