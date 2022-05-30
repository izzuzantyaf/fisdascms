import { Body, Controller, Get, Put } from '@nestjs/common';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';
import { ScheduleService } from 'src/use-cases/schedule/schedule.service';

@Controller('api/schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async getAll() {
    const schedules = await this.scheduleService.getAll();
    return new SuccessfulResponse('Sukses', { ...schedules });
  }

  @Put()
  async update(@Body() updateData: object[]) {
    const updatedSchedules = await this.scheduleService.updateMany(updateData);
    return new SuccessfulResponse('Jadwal berhasil diupdate', {
      ...updatedSchedules,
    });
  }
}