import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { MongoDataServices } from './mongo-data-service.service';
import { Admin, AdminSchema } from 'src/entities/models/admin.entity';
import { Handout, HandoutSchema } from 'src/entities/models/handout.entity';
import {
  CodeOfConduct,
  CodeOfConductSchema,
} from 'src/entities/models/code-of-conduct.entity';
import {
  Organigram,
  OrganigramSchema,
} from 'src/entities/models/organigram.entity';
import { Schedule, ScheduleSchema } from 'src/entities/models/schedule.entity';
import {
  Assistant,
  AssistantSchema,
} from 'src/entities/models/assistant.entity';
import {
  PracticumModule,
  PracticumModuleSchema,
} from 'src/entities/models/practicum-module.entity';

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
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
