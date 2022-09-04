import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import {
  Schedule,
  ScheduleConstructorProps,
} from 'src/core/entities/schedule.entity';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { ScheduleFactoryService } from './schedule-factory.service';
import { ScheduleQuery, UpdateScheduleDto } from 'src/core/dtos/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    private dataService: DataServiceService,
    private scheduleFactory: ScheduleFactoryService,
  ) {}

  async getAll(query: ScheduleQuery) {
    const schedules = this.scheduleFactory.createMany(
      await this.dataService.schedules.getAll({
        filter: query,
      }),
    );
    return schedules;
  }

  protected getClassSchedule(schedules: Schedule[]) {
    return schedules.filter((schedule) => isEmpty(schedule.faculty))[0];
  }

  protected getFacultySchedules(schedules: Schedule[]) {
    return schedules.filter((schedule) => !isEmpty(schedule.faculty));
  }

  async update(updateScheduleDto: UpdateScheduleDto) {
    console.log('Incoming data :', updateScheduleDto);
    const newSchedule = this.scheduleFactory.create(
      updateScheduleDto as ScheduleConstructorProps,
    );
    const validationError = newSchedule.validateProps();
    if (isNotEmpty(validationError))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { validationError }),
      );
    const updatedSchedule = this.scheduleFactory.create(
      await this.dataService.schedules.updateById(newSchedule._id, newSchedule),
    );
    console.log('Updated schedules :', updatedSchedule);
    return updatedSchedule;
  }

  async updateMany(updateScheduleDtos: UpdateScheduleDto[]) {
    console.log('Incoming data :', updateScheduleDtos);
    const newSchedules = this.scheduleFactory.createMany(
      updateScheduleDtos as ScheduleConstructorProps[],
    );
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
