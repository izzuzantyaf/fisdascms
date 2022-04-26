import { Module } from '@nestjs/common';
import { CodeOfConductController } from 'src/controllers/code-of-conduct/code-of-conduct.controller';
import { DataServicesModule } from '../data-services/data-services.module';
import { CodeOfConductFactoryService } from './code-of-conduct-factory.service';
import { CodeOfConductService } from './code-of-conduct.service';

@Module({
  imports: [DataServicesModule],
  providers: [CodeOfConductService, CodeOfConductFactoryService],
  controllers: [CodeOfConductController],
  exports: [CodeOfConductService, CodeOfConductFactoryService],
})
export class CodeOfConductModule {}
