import { Controller, Get } from '@nestjs/common';
import { PracticumModuleService } from './practicum-module.service';

@Controller('api/practicum-module')
export class PracticumModuleController {
  constructor(private practicumModuleService: PracticumModuleService) {}

  @Get()
  async getAll() {
    return await this.practicumModuleService.getAll();
  }

  @Get('pretask')
  async getPreTasks() {
    return await this.practicumModuleService.getPreTasks();
  }
}
