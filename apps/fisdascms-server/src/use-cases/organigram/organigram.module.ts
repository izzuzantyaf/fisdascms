import { Module } from '@nestjs/common';
import { OrganigramController } from './organigram.controller';
import { DataServiceModule } from '../../database/data-service.module';
import { OrganigramFactoryService } from './organigram-factory.service';
import { OrganigramService } from './organigram.service';

@Module({
  imports: [DataServiceModule],
  providers: [OrganigramService, OrganigramFactoryService],
  controllers: [OrganigramController],
  exports: [OrganigramService, OrganigramFactoryService],
})
export class OrganigramModule {}
