import { Module } from '@nestjs/common';
import { OrganigramController } from 'src/controllers/organigram/organigram.controller';
import { DataServicesModule } from '../data-services/data-services.module';
import { OrganigramFactoryService } from './organigram-factory.service';
import { OrganigramService } from './organigram.service';

@Module({
  imports: [DataServicesModule],
  providers: [OrganigramService, OrganigramFactoryService],
  controllers: [OrganigramController],
  exports: [OrganigramService, OrganigramFactoryService],
})
export class OrganigramModule {}
