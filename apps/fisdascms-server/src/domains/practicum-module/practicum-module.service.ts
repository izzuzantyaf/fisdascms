import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { PracticumModuleFactory } from './practicum-module-factory.service';
import { UpdatePracticumModuleDto } from 'src/domains/practicum-module/dto/practicum-module.dto';

@Injectable()
export class PracticumModuleService {
  private readonly logger = new Logger(PracticumModuleService.name);

  constructor(
    private dataService: DataServiceService,
    private practicumModuleFactory: PracticumModuleFactory,
  ) {}

  async getAll() {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getAll(),
    );
  }

  async getPreTasks(filter?: object) {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getPreTasks(filter),
    );
  }

  async getVideos(filter?: object) {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getVideos(filter),
    );
  }

  async getSimulators(filter?: object) {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getSimulators(filter),
    );
  }

  async getJournalCovers(filter?: object) {
    return this.practicumModuleFactory.createMany(
      await this.dataService.practicumModules.getJournalCovers(filter),
    );
  }

  async update(updatePracticumModuleDto: UpdatePracticumModuleDto) {
    this.logger.debug(
      `updatePracticumModuleDto ${JSON.stringify(
        updatePracticumModuleDto,
        undefined,
        2,
      )}`,
    );
    const newPracticumModule = this.practicumModuleFactory.create(
      updatePracticumModuleDto,
    );
    const validationError = newPracticumModule.validateProps();
    if (isNotEmpty(validationError)) {
      this.logger.log(
        `PracticumModule data is not valid ${JSON.stringify(validationError)}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { validationError }),
      );
    }
    const updateResult = await this.dataService.practicumModules.updateById(
      newPracticumModule._id,
      newPracticumModule,
    );
    if (isEmpty(updateResult)) {
      this.logger.log(
        `PracticumModule update failed ${JSON.stringify({
          practicumModuleId: newPracticumModule._id,
        })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Konten praktikum gagal diupdate'),
      );
    }
    this.logger.debug(
      `Updated PracticumModule ${JSON.stringify(updateResult, undefined, 2)}`,
    );
    this.logger.log(
      `PracticumModule update success ${JSON.stringify({
        practicumModuleId: newPracticumModule._id,
      })}`,
    );
    const updatedPracticumModule =
      this.practicumModuleFactory.create(updateResult);
    return updatedPracticumModule;
  }
}
