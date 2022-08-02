import {
  PracticumModule,
  PracticumModuleDocument,
  PreTask,
} from '../entity/practicum-module.entity';
import { MongoGenericRepository } from './mongo-generic.repo';
import { FilterQuery, Model } from 'mongoose';
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

  async getPreTasks(filter?: FilterQuery<PreTask>) {
    const matcher = {};
    for (const key in filter) {
      let value = filter[key];
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      matcher[`preTask.${key}`] = value;
    }
    console.log('Matcher :', matcher);
    return this._repository
      .aggregate()
      .project({
        _id: true,
        name: true,
        code: true,
        language: true,
        faIconName: true,
        preTask: true,
      })
      .match(matcher)
      .sort({ _id: 'asc' });
  }
}
