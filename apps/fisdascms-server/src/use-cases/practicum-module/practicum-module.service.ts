import { BadRequestException, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/lib/dtos/response.dto';
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

  async getPreTasks(filter: object) {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getPreTasks(filter),
    );
  }

  async update(updatePracticumModuleDto: object) {
    console.log('updatePracticumModuleDto :', updatePracticumModuleDto);
    const newPracticumModule = this.practicumModuleFactory.create(
      updatePracticumModuleDto,
    );
    const validationError = newPracticumModule.validateProps();
    if (isNotEmpty(validationError))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { validationError }),
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
