import { Body, Controller, Get, Put } from '@nestjs/common';
import { SuccessfulResponse } from 'src/lib/dtos/response.dto';
import { PracticumModuleService } from './practicum-module.service';

@Controller('api/practicum-module')
export class PracticumModuleController {
  constructor(private practicumModuleService: PracticumModuleService) {}

  @Get()
  async getAll() {
    return await this.practicumModuleService.getAll();
  }

  @Put()
  async update(@Body() updatePracticumModuleDto: object) {
    const updatedPracticumModule = await this.practicumModuleService.update(
      updatePracticumModuleDto,
    );
    return new SuccessfulResponse('Konten praktikum berhasil diupdate', {
      updatedPracticumModule,
    });
  }
}
