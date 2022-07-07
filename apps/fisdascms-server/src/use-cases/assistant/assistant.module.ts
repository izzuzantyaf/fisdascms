import { Module } from '@nestjs/common';
import { AssistantController } from './assistant.controller';
import { DataServiceModule } from 'src/database/data-service.module';
import { AssistantFactoryService } from './assistant-factory.service';
import { AssistantService } from './assistant.service';

@Module({
  imports: [DataServiceModule],
  providers: [AssistantService, AssistantFactoryService],
  controllers: [AssistantController],
  exports: [AssistantService, AssistantFactoryService],
})
export class AssistantModule {}
