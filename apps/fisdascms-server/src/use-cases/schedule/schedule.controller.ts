import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { ScheduleQuery, UpdateScheduleDto } from 'src/core/dtos/schedule.dto';
import { ScheduleService } from 'src/use-cases/schedule/schedule.service';

@ApiTags('schedule')
@Controller('api/schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async getAll(@Query() query?: ScheduleQuery) {
    console.log('Schedule query :', query);
    const schedules = await this.scheduleService.getAll(query);
    return new SuccessfulResponse('Sukses', schedules);
  }

  @Put()
  async update(@Body() updateScheduleDto: UpdateScheduleDto) {
    const updatedSchedule = await this.scheduleService.update(
      updateScheduleDto,
    );
    return new SuccessfulResponse('Jadwal berhasil diupdate', updatedSchedule);
  }
}
