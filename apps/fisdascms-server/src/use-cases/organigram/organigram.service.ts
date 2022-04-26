import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { OrganigramFactoryService } from './organigram-factory.service';

@Injectable()
export class OrganigramService {
  constructor(
    private dataService: IDataServices,
    private organigramFactory: OrganigramFactoryService,
  ) {}

  async getOne() {
    const organigram = this.organigramFactory.create(
      await this.dataService.organigrams.getFirst(),
    );
    return organigram;
  }

  async update(updateData: object) {
    console.log('Incoming data :', updateData);
    const newOrganigram = this.organigramFactory.create(updateData);
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
