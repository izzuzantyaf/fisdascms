import { IHandoutGenericRepository } from 'src/entities/abstracts/handout-repo.interface';
import { Handout, HandoutDocument } from 'src/entities/models/handout.entity';
import { MongoGenericRepository } from './mongo-generic-repo';
import { Model } from 'mongoose';

export class HandoutMongoRepository
  extends MongoGenericRepository<Handout>
  implements IHandoutGenericRepository
{
  constructor(repository: Model<HandoutDocument>) {
    super(repository);
  }
}
