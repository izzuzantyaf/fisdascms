import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
// import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { Schedule } from 'src/frameworks/database/mongodb/entity/schedule.entity';
import { MongoDataServices } from 'src/frameworks/database/mongodb/mongo-data-service.service';
import { ScheduleFactoryService } from './schedule-factory.service';

@Injectable()
export class ScheduleService {
  constructor(
    private dataService: MongoDataServices,
    private scheduleFactory: ScheduleFactoryService,
  ) {}

  async getAll() {
    const schedules = this.scheduleFactory.createMany(
      await this.dataService.schedules.getAll(),
    );
    const classSchedule = this.getClassSchedule(schedules);
    const facultySchedules = this.getFacultySchedules(schedules);
    return { classSchedule, facultySchedules };
  }

  protected getClassSchedule(schedules: Schedule[]) {
    return schedules.filter((schedule) => isEmpty(schedule.faculty))[0];
  }

  protected getFacultySchedules(schedules: Schedule[]) {
    return schedules.filter((schedule) => !isEmpty(schedule.faculty));
  }

  async updateMany(updateData: object[]) {
    console.log('Incoming data :', updateData);
    const newSchedules = this.scheduleFactory.createMany(updateData);
    const updatedSchedules: Schedule[] = [];
    for (const newSchedule of newSchedules) {
      updatedSchedules.push(
        this.scheduleFactory.create(
          await this.dataService.schedules.updateById(
            newSchedule._id,
            newSchedule,
          ),
        ),
      );
    }
    console.log('Updated schedules :', updatedSchedules);
    const classSchedule = this.getClassSchedule(updatedSchedules);
    const facultySchedules = this.getFacultySchedules(updatedSchedules);
    return { classSchedule, facultySchedules };
  }
}
