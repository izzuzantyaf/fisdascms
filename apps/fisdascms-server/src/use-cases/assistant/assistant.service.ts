import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { AssistantFactoryService } from './assistant-factory.service';

@Injectable()
export class AssistantService {
  constructor(
    private dataService: IDataServices,
    private assistantFactory: AssistantFactoryService,
  ) {}

  async getAll() {
    return this.assistantFactory.createMany(
      await this.dataService.assistants.getAll(),
    );
  }
}
