import { Module } from '@nestjs/common';
import { OrganigramController } from './organigram.controller';
import { OrganigramFactoryService } from './organigram-factory.service';
import { OrganigramService } from './organigram.service';

@Module({
  providers: [OrganigramService, OrganigramFactoryService],
  controllers: [OrganigramController],
  exports: [OrganigramService, OrganigramFactoryService],
})
export class OrganigramModule {}
