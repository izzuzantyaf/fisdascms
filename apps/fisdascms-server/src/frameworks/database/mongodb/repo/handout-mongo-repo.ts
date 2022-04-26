import { IHandoutRepository } from 'src/entities/abstracts/repo/handout-repo.interface';
import { Handout, HandoutDocument } from 'src/entities/models/handout.entity';
import { MongoGenericRepository } from './mongo-generic-repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';

export class HandoutMongoRepository
  extends MongoGenericRepository<Handout>
  implements IHandoutRepository
{
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
