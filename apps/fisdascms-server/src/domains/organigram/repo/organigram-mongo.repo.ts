import { Organigram, OrganigramDocument } from '../entities/organigram.entity';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';
import { MongoGenericRepository } from 'src/database/repo/mongo-generic.repo';

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
