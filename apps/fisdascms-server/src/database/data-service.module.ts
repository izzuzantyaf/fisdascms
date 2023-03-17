import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataServiceService } from './data-service.service';
import { Admin, AdminSchema } from '../domains/admin/entities/admin.entity';
import {
  Handout,
  HandoutSchema,
} from '../domains/handout/entities/handout.entity';
import {
  CodeOfConduct,
  CodeOfConductSchema,
} from '../domains/code-of-conduct/entities/code-of-conduct.entity';
import {
  Organigram,
  OrganigramSchema,
} from '../domains/organigram/entities/organigram.entity';
import {
  Schedule,
  ScheduleSchema,
} from '../domains/schedule/entities/schedule.entity';
import {
  Assistant,
  AssistantSchema,
} from '../domains/assistant/entities/assistant.entity';
import {
  PracticumModule,
  PracticumModuleSchema,
} from '../domains/practicum-module/entities/practicum-module.entity';
import {
  SocialMedia,
  SocialMediaSchema,
} from 'src/domains/social-media/entities/social-media.entity';

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
      { name: SocialMedia.name, schema: SocialMediaSchema },
    ]),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [DataServiceService],
  exports: [DataServiceService],
})
export class DataServiceModule {}
