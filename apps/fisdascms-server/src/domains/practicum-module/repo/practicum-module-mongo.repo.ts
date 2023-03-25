import {
  JournalCover,
  PracticumModule,
  PracticumModuleDocument,
  PreTask,
  Simulator,
  Video,
} from '../entities/practicum-module.entity';
import { FilterQuery, Model } from 'mongoose';
import { isEmpty } from 'class-validator';
import { MongoGenericRepository } from 'src/database/repo/mongo-generic.repo';

export class PracticumModuleMongoRepository extends MongoGenericRepository<PracticumModule> {
  mustPresentProjection = {
    _id: true,
    name: true,
    code: true,
    language: true,
    faIconName: true,
  };

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
    this.logger.debug(`Matcher ${JSON.stringify(matcher, undefined, 2)}`);
    return this._repository
      .aggregate()
      .project({
        ...this.mustPresentProjection,
        preTask: true,
      })
      .match(matcher)
      .sort({ _id: 'asc' });
  }

  async getVideos(filter?: FilterQuery<Video>) {
    const matcher = {};
    for (const key in filter) {
      let value = filter[key];
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      matcher[`video.${key}`] = value;
    }
    this.logger.debug(`Matcher ${JSON.stringify(matcher, undefined, 2)}`);
    return this._repository
      .aggregate()
      .project({
        ...this.mustPresentProjection,
        video: true,
      })
      .match(matcher)
      .sort({ _id: 'asc' });
  }

  async getSimulators(filter?: FilterQuery<Simulator>) {
    const matcher = {};
    for (const key in filter) {
      let value = filter[key];
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      matcher[`simulator.${key}`] = value;
    }
    this.logger.debug(`Matcher ${JSON.stringify(matcher, undefined, 2)}`);
    return this._repository
      .aggregate()
      .project({
        ...this.mustPresentProjection,
        simulator: true,
      })
      .match(matcher)
      .sort({ _id: 'asc' });
  }

  async getJournalCovers(filter?: FilterQuery<JournalCover>) {
    const matcher = {};
    for (const key in filter) {
      let value = filter[key];
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      matcher[`journalCover.${key}`] = value;
    }
    this.logger.debug(`Matcher ${JSON.stringify(matcher, undefined, 2)}`);
    return this._repository
      .aggregate()
      .project({
        ...this.mustPresentProjection,
        journalCover: true,
      })
      .match(matcher)
      .sort({ _id: 'asc' });
  }
}
