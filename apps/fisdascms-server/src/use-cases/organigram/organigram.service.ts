import { BadRequestException, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { OrganigramFactoryService } from './organigram-factory.service';
import { UpdateOrganigramDto } from 'src/core/dtos/organigram.dto';

@Injectable()
export class OrganigramService {
  constructor(
    private dataService: DataServiceService,
    private organigramFactory: OrganigramFactoryService,
  ) {}

  async getOne() {
    const organigram = this.organigramFactory.create(
      await this.dataService.organigrams.getFirst(),
    );
    return organigram;
  }

  async update(updateOrganigramDto: UpdateOrganigramDto) {
    console.log('Incoming data :', updateOrganigramDto);
    const newOrganigram = this.organigramFactory.create(updateOrganigramDto);
    const validationError = newOrganigram.validateProps();
    if (isNotEmpty(validationError))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { validationError }),
      );
    const updatedOrganigram = this.organigramFactory.create(
      await this.dataService.organigrams.updateById(
        newOrganigram._id,
        newOrganigram,
      ),
    );
    console.log('Updated organigram :', updatedOrganigram);
    return updatedOrganigram;
  }
}
