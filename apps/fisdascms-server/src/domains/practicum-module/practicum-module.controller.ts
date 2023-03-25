import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePracticumModuleDto } from 'src/domains/practicum-module/dto/practicum-module.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { PracticumModuleService } from './practicum-module.service';

@ApiTags('practicum material')
@Controller('api/practicum-module')
export class PracticumModuleController {
  constructor(private practicumModuleService: PracticumModuleService) {}

  @Get()
  async getAll() {
    const practicumModules = await this.practicumModuleService.getAll();
    return new SuccessfulResponse('Sukses', practicumModules);
  }

  @Get('/pretasks')
  async getPreTasks(@Query() filter?: any) {
    const preTasks = await this.practicumModuleService.getPreTasks(filter);
    return new SuccessfulResponse('Sukses', preTasks);
  }

  @Get('/videos')
  async getVideos(@Query() filter?: any) {
    const preTasks = await this.practicumModuleService.getVideos(filter);
    return new SuccessfulResponse('Sukses', preTasks);
  }

  @Get('/simulators')
  async getSimulators(@Query() filter?: any) {
    const preTasks = await this.practicumModuleService.getSimulators(filter);
    return new SuccessfulResponse('Sukses', preTasks);
  }

  @Get('/journal-covers')
  async getJournalCovers(@Query() filter?: any) {
    const preTasks = await this.practicumModuleService.getJournalCovers(filter);
    return new SuccessfulResponse('Sukses', preTasks);
  }

  @Put()
  async update(@Body() updatePracticumModuleDto: UpdatePracticumModuleDto) {
    const updatedPracticumModule = await this.practicumModuleService.update(
      updatePracticumModuleDto,
    );
    return new SuccessfulResponse(
      'Konten praktikum berhasil diupdate',
      updatedPracticumModule,
    );
  }
}
