import { Module } from '@nestjs/common';
import { CodeOfConductController } from './code-of-conduct.controller';
import { DataServiceModule } from '../../database/data-service.module';
import { CodeOfConductFactoryService } from './code-of-conduct-factory.service';
import { CodeOfConductService } from './code-of-conduct.service';

@Module({
  imports: [DataServiceModule],
  providers: [CodeOfConductService, CodeOfConductFactoryService],
  controllers: [CodeOfConductController],
  exports: [CodeOfConductService, CodeOfConductFactoryService],
})
export class CodeOfConductModule {}
