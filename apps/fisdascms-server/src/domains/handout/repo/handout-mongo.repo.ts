import { Handout, HandoutDocument } from '../entities/handout.entity';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';
import { MongoGenericRepository } from 'src/database/repo/mongo-generic.repo';

export class HandoutMongoRepository extends MongoGenericRepository<Handout> {
  constructor(repository: Model<HandoutDocument>) {
    super(repository);
  }

  async seed(handouts: Handout[]) {
    const handoutCollection = await this._repository.findOne().exec();
    if (isEmpty(handoutCollection)) {
      this._repository.insertMany(handouts);
      console.log('Handout collection seeded successfuly');
    }
  }
}
