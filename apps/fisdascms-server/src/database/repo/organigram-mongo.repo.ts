import {
  Organigram,
  OrganigramDocument,
} from '../../core/entities/organigram.entity';
import { MongoGenericRepository } from './mongo-generic.repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';

export class OrganigramMongoRepository extends MongoGenericRepository<Organigram> {
  constructor(repository: Model<OrganigramDocument>) {
    super(repository);
  }

  async seed(organigram: Organigram) {
    const organigramCollection = await this._repository.findOne().exec();
    if (isEmpty(organigramCollection)) {
      this._repository.create(organigram);
      console.log('Organigram collection seeded successfully');
    }
  }
}
