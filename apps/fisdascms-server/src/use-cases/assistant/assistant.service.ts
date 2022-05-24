import { Injectable } from '@nestjs/common';
// import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { MongoDataServices } from 'src/frameworks/database/mongodb/mongo-data-service.service';
import { AssistantFactoryService } from './assistant-factory.service';

@Injectable()
export class AssistantService {
  constructor(
    private dataService: MongoDataServices,
    private assistantFactory: AssistantFactoryService,
  ) {}

  async getAll() {
    return this.assistantFactory.createMany(
      await this.dataService.assistants.getAll(),
    );
  }
}
