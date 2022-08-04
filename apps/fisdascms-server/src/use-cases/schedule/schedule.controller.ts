import { Body, Controller, Get, Put } from '@nestjs/common';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { ScheduleService } from 'src/use-cases/schedule/schedule.service';

@Controller('api/schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async getAll() {
    const schedules = await this.scheduleService.getAll();
    return new SuccessfulResponse('Sukses', { schedules });
  }

  @Put()
  async update(@Body() updateData: object) {
    const updatedSchedule = await this.scheduleService.update(updateData);
    return new SuccessfulResponse('Jadwal berhasil diupdate', {
      updatedSchedule,
    });
  }
}
