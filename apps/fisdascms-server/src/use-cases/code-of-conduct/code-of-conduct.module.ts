import { Module } from '@nestjs/common';
import { CodeOfConductController } from './code-of-conduct.controller';
import { CodeOfConductFactoryService } from './code-of-conduct-factory.service';
import { CodeOfConductService } from './code-of-conduct.service';

@Module({
  providers: [CodeOfConductService, CodeOfConductFactoryService],
  controllers: [CodeOfConductController],
  exports: [CodeOfConductService, CodeOfConductFactoryService],
})
export class CodeOfConductModule {}
