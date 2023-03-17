import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { DataServiceService } from 'src/database/data-service.service';
import {
  Schedule,
  ScheduleConstructorProps,
} from 'src/domains/schedule/entities/schedule.entity';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { ScheduleFactoryService } from './schedule-factory.service';
import {
  ScheduleQuery,
  UpdateScheduleDto,
} from 'src/domains/schedule/dto/schedule.dto';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    private dataService: DataServiceService,
    private scheduleFactory: ScheduleFactoryService,
  ) {}

  async getAll(filter: ScheduleQuery) {
    this.logger.debug(
      `Schedule filter ${JSON.stringify(filter, undefined, 2)}`,
    );
    const schedules = this.scheduleFactory.createMany(
      await this.dataService.schedules.getAll({
        filter,
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
    this.logger.debug(
      `updateScheduleDto ${JSON.stringify(updateScheduleDto, undefined, 2)}`,
    );
    const newSchedule = this.scheduleFactory.create(
      updateScheduleDto as ScheduleConstructorProps,
    );
    const validationError = newSchedule.validateProps();
    if (isNotEmpty(validationError)) {
      this.logger.log(
        `Schedule data is not valid ${JSON.stringify(validationError)}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { validationError }),
      );
    }
    const updateResult = await this.dataService.schedules.updateById(
      newSchedule._id,
      newSchedule,
    );
    if (isEmpty(updateResult)) {
      this.logger.log(
        `Schedule update failed ${JSON.stringify({
          scheduleId: newSchedule._id,
        })}`,
      );
      throw new BadRequestException(new ErrorResponse('Jadwal gagal diupdate'));
    }
    this.logger.debug(
      `Updated schedules ${JSON.stringify(updateResult, undefined, 2)}`,
    );
    this.logger.log(
      `Schedule update success ${JSON.stringify({
        scheduleId: newSchedule._id,
      })}`,
    );
    const updatedSchedule = this.scheduleFactory.create(updateResult);
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
