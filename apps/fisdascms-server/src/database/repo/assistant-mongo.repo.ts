import {
  Assistant,
  AssistantDocument,
} from '../../core/entities/assistant.entity';
import { MongoGenericRepository } from './mongo-generic.repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';

export class AssistantMongoRepository extends MongoGenericRepository<Assistant> {
  constructor(repository: Model<AssistantDocument>) {
    super(repository);
  }

  async seed(assistants: Assistant[]) {
    const assistantCollection = await this._repository.findOne().exec();
    if (isEmpty(assistantCollection)) {
      this._repository.insertMany(assistants);
      console.log('Assistant collection seeded successfully');
    }
  }

  async getAll() {
    return this._repository.find().sort({ name: 'asc' }).exec();
  }

  async search(keyword: string) {
    const searchRegex = new RegExp(keyword, 'i'); //* return regex /keyword/i
    const searchResult = await this._repository
      .find({
        $or: [{ name: searchRegex }, { code: searchRegex }], //* search berdasarkan nama atau kode asisten
      })
      .exec();
    return searchResult;
  }
}
