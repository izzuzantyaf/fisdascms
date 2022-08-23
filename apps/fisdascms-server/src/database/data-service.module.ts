import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataServiceService } from './data-service.service';
import { Admin, AdminSchema } from '../core/entities/admin.entity';
import { Handout, HandoutSchema } from '../core/entities/handout.entity';
import {
  CodeOfConduct,
  CodeOfConductSchema,
} from '../core/entities/code-of-conduct.entity';
import {
  Organigram,
  OrganigramSchema,
} from '../core/entities/organigram.entity';
import { Schedule, ScheduleSchema } from '../core/entities/schedule.entity';
import { Assistant, AssistantSchema } from '../core/entities/assistant.entity';
import {
  PracticumModule,
  PracticumModuleSchema,
} from '../core/entities/practicum-module.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Handout.name, schema: HandoutSchema },
      { name: CodeOfConduct.name, schema: CodeOfConductSchema },
      { name: Organigram.name, schema: OrganigramSchema },
      { name: Schedule.name, schema: ScheduleSchema },
      { name: Assistant.name, schema: AssistantSchema },
      { name: PracticumModule.name, schema: PracticumModuleSchema },
    ]),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [DataServiceService],
  exports: [DataServiceService],
})
export class DataServiceModule {}
