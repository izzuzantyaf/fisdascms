import { Injectable } from '@nestjs/common';
// import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { MongoDataServices } from 'src/frameworks/database/mongodb/mongo-data-service.service';
import { HandoutFactoryService } from './handout-factory.service';

@Injectable()
export class HandoutService {
  constructor(
    private dataService: MongoDataServices,
    private handoutFactory: HandoutFactoryService,
  ) {}

  async getAll() {
    return this.handoutFactory.createMany(
      await this.dataService.handouts.getAll(),
    );
  }

  async update(updateHandoutDto: object) {
    console.log('Incoming data :', updateHandoutDto);
    const newHandout = this.handoutFactory.create(updateHandoutDto);
    const updatedHandout = await this.dataService.handouts.updateById(
      newHandout._id,
      newHandout,
    );
    console.log('Updated handout :', updatedHandout);
    return updatedHandout;
  }
}
