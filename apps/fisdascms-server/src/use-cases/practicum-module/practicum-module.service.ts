import { Injectable } from '@nestjs/common';
import { DataServiceService } from 'src/database/data-service.service';
import { PracticumModuleFactory } from './practicum-module-factory.service';

@Injectable()
export class PracticumModuleService {
  constructor(
    private dataService: DataServiceService,
    private practicumModuleFactory: PracticumModuleFactory,
  ) {}

  async getAll() {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getAll(),
    );
  }

  async getPreTasks() {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getPreTasks(),
    );
  }
}
