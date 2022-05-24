import { Assistant } from '../entity/assistant.entity';
import { MongoGenericRepository } from './mongo-generic.repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';

export class AssistantMongoRepository extends MongoGenericRepository<Assistant> {
  constructor(repository: Model<Assistant>) {
    super(repository);
  }

  async seed(assistants: Assistant[]) {
    const assistantCollection = await this._repository.findOne().exec();
    if (isEmpty(assistantCollection)) {
      this._repository.insertMany(assistants);
      console.log('Assistant collection seeded successfully');
    }
  }
}
