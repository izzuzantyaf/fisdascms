import { Module } from '@nestjs/common';
import { PracticumModuleService } from './practicum-module.service';
import { PracticumModuleController } from './practicum-module.controller';
import { PracticumModuleFactory } from './practicum-module-factory.service';
import { DataServiceModule } from 'src/database/data-service.module';

@Module({
  imports: [DataServiceModule],
  providers: [PracticumModuleService, PracticumModuleFactory],
  controllers: [PracticumModuleController],
})
export class PracticumModuleModule {}
