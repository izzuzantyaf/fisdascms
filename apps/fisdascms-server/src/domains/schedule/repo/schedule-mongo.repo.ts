import { Schedule, ScheduleDocument } from '../entities/schedule.entity';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';
import { MongoGenericRepository } from 'src/database/repo/mongo-generic.repo';

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
