import { Body, Controller, Get, Put } from '@nestjs/common';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { UpdateScheduleDto } from 'src/core/dtos/schedule.dto';
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
  async update(@Body() updateScheduleDto: UpdateScheduleDto) {
    const updatedSchedule = await this.scheduleService.update(
      updateScheduleDto,
    );
    return new SuccessfulResponse('Jadwal berhasil diupdate', {
      updatedSchedule,
    });
  }
}
