import {
  PracticumModule,
  PracticumModuleDocument,
} from '../entity/practicum-module.entity';
import { MongoGenericRepository } from './mongo-generic.repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';

export class PracticumModuleMongoRepository extends MongoGenericRepository<PracticumModule> {
  constructor(repository: Model<PracticumModuleDocument>) {
    super(repository);
  }

  async seed(practicumModules: PracticumModule[]) {
    const practicumModuleCollection = await this._repository.findOne().exec();
    if (isEmpty(practicumModuleCollection)) {
      this._repository.insertMany(practicumModules);
      console.log('Practicum module collection seeded successfully');
    }
  }

  async getPreTasks() {
    return await this._repository
      .find(
        {},
        {
          _id: true,
          name: true,
          code: true,
          language: true,
          faIconName: true,
          preTask: true,
        },
      )
      .exec();
  }
}
