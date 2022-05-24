import { Injectable } from '@nestjs/common';
import { DataServiceService } from 'src/database/data-service.service';
import { AssistantFactoryService } from './assistant-factory.service';

@Injectable()
export class AssistantService {
  constructor(
    private dataService: DataServiceService,
    private assistantFactory: AssistantFactoryService,
  ) {}

  async getAll() {
    return this.assistantFactory.createMany(
      await this.dataService.assistants.getAll(),
    );
  }
}
