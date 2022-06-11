import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataServiceService } from './data-service.service';
import { Admin, AdminSchema } from './entity/admin.entity';
import { Handout, HandoutSchema } from './entity/handout.entity';
import {
  CodeOfConduct,
  CodeOfConductSchema,
} from './entity/code-of-conduct.entity';
import { Organigram, OrganigramSchema } from './entity/organigram.entity';
import { Schedule, ScheduleSchema } from './entity/schedule.entity';
import { Assistant, AssistantSchema } from './entity/assistant.entity';
import {
  PracticumModule,
  PracticumModuleSchema,
} from './entity/practicum-module.entity';

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
