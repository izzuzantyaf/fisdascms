import {
  Schedule,
  ScheduleDocument,
} from '../../core/entities/schedule.entity';
import { MongoGenericRepository } from './mongo-generic.repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';

export class ScheduleMongoRepository extends MongoGenericRepository<Schedule> {
  constructor(repository: Model<ScheduleDocument>) {
    super(repository);
  }

  getClassSchedule(): Promise<Schedule> {
    throw new Error('Method not implemented.');
  }

  getFacultySchedules(): Promise<Schedule[]> {
    throw new Error('Method not implemented.');
  }

  async seed(schedules: Schedule[]) {
    // cek apakah collection schedules kosong?
    const scheduleCollection = await this._repository.findOne().exec();
    if (isEmpty(scheduleCollection)) {
      // jika collection schedules kosong, masukkan data awal
      this._repository.insertMany(schedules);
      console.log('Schedule collection seeded successfully');
    }
  }
}
