import { Module } from '@nestjs/common';
import { AssistantController } from 'src/controllers/assistant/assistant.controller';
import { DataServicesModule } from '../data-services/data-services.module';
import { AssistantFactoryService } from './assistant-factory.service';
import { AssistantService } from './assistant.service';

@Module({
  imports: [DataServicesModule],
  providers: [AssistantService, AssistantFactoryService],
  controllers: [AssistantController],
  exports: [AssistantService, AssistantFactoryService],
})
export class AssistantModule {}
