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

  async update(updatePracticumModuleDto: object) {
    console.log('Incoming data :', updatePracticumModuleDto);
    const newPracticumModule = this.practicumModuleFactory.create(
      updatePracticumModuleDto,
    );
    const updatedPracticumModule = this.practicumModuleFactory.create(
      await this.dataService.practicumModules.updateById(
        newPracticumModule._id,
        newPracticumModule,
      ),
    );
    console.log('Updated practicum module :', updatedPracticumModule);
    return updatedPracticumModule;
  }
}
