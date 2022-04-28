import { Schedule } from 'src/entities/models/schedule.entity';
import { IGenericRepository } from './generic-repo.interface';

export interface IScheduleRepository extends IGenericRepository<Schedule> {
  seed(schedules: Schedule[]): void;
  getClassSchedule(): Promise<Schedule>;
  getFacultySchedules(): Promise<Schedule[]>;
}
