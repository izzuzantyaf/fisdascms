import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import { Schedule } from 'src/database/entity/schedule.entity';
import { ScheduleFactoryService } from './schedule-factory.service';

@Injectable()
export class ScheduleService {
  constructor(
    private dataService: DataServiceService,
    private scheduleFactory: ScheduleFactoryService,
  ) {}

  async getAll() {
    const schedules = this.scheduleFactory.createMany(
      await this.dataService.schedules.getAll(),
    );
    return schedules;
  }

  protected getClassSchedule(schedules: Schedule[]) {
    return schedules.filter((schedule) => isEmpty(schedule.faculty))[0];
  }

  protected getFacultySchedules(schedules: Schedule[]) {
    return schedules.filter((schedule) => !isEmpty(schedule.faculty));
  }

  async update(updateData: object) {
    console.log('Incoming data :', updateData);
    const newSchedule = this.scheduleFactory.create(updateData);
    const updatedSchedule = this.scheduleFactory.create(
      await this.dataService.schedules.updateById(newSchedule._id, newSchedule),
    );
    console.log('Updated schedules :', updatedSchedule);
    return updatedSchedule;
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
