import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { IDatabaseSeeder } from 'src/entities/abstracts/database-seeder.interface';
import { Admin, AdminDocument } from 'src/entities/models/admin.entity';
import {
  Assistant,
  AssistantDocument,
} from 'src/entities/models/assistant.entity';
import {
  CodeOfConduct,
  CodeOfConductDocument,
} from 'src/entities/models/code-of-conduct.entity';
import { Handout, HandoutDocument } from 'src/entities/models/handout.entity';
import {
  Organigram,
  OrganigramDocument,
} from 'src/entities/models/organigram.entity';
import {
  Schedule,
  ScheduleDocument,
} from 'src/entities/models/schedule.entity';
import { adminSeeder } from 'src/entities/seeders/admin.seeder';
import { assistantSeeder } from 'src/entities/seeders/assistant.seeder';
import { codeOfConductSeeder } from 'src/entities/seeders/code-of-conduct.seeder';
import { handoutSeeder } from 'src/entities/seeders/handout.seeder';
import { organigramSeeder } from 'src/entities/seeders/organigram.seeder';
import { scheduleSeeder } from 'src/entities/seeders/schedule.seeder';
import { AdminMongoRepository } from './repo/admin-mongo-repo';
import { AssistantMongoRepository } from './repo/assistant-mongo-repo';
import { CodeOfConductMongoRepository } from './repo/code-of-conduct-mongo-repo';
import { HandoutMongoRepository } from './repo/handout-mongo-repo';
import { OrganigramMongoRepository } from './repo/organigram-mongo-repo';
import { ScheduleMongoRepository } from './repo/schedule-mongo-repo';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap, IDatabaseSeeder
{
  admins: AdminMongoRepository;
  handouts: HandoutMongoRepository;
  codeOfConducts: CodeOfConductMongoRepository;
  organigrams: OrganigramMongoRepository;
  schedules: ScheduleMongoRepository;
  assistants: AssistantMongoRepository;

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Handout.name) private handoutModel: Model<HandoutDocument>,
    @InjectModel(CodeOfConduct.name)
    private codeOfConductModel: Model<CodeOfConductDocument>,
    @InjectModel(Organigram.name)
    private organigramModel: Model<OrganigramDocument>,
    @InjectModel(Schedule.name)
    private scheduleModel: Model<ScheduleDocument>,
    @InjectModel(Assistant.name)
    private assistantModel: Model<AssistantDocument>,
  ) {}

  onApplicationBootstrap() {
    this.admins = new AdminMongoRepository(this.adminModel);
    this.handouts = new HandoutMongoRepository(this.handoutModel);
    this.codeOfConducts = new CodeOfConductMongoRepository(
      this.codeOfConductModel,
    );
    this.organigrams = new OrganigramMongoRepository(this.organigramModel);
    this.schedules = new ScheduleMongoRepository(this.scheduleModel);
    this.assistants = new AssistantMongoRepository(this.assistantModel);
    this.seedAdmin();
    this.seedHandout();
    this.seedCodeOfConduct();
    this.seedOrganigram();
    this.seedSchedule();
    this.seedAssistant();
  }

  async seedAdmin() {
    const admin = new Admin(adminSeeder);
    await admin.hashPassword();
    this.admins.seed(admin);
  }

  seedHandout() {
    const handouts = handoutSeeder.map(
      (handoutSeed) => new Handout(handoutSeed),
    );
    this.handouts.seed(handouts);
  }

  seedCodeOfConduct() {
    const codeOfConduct = new CodeOfConduct(codeOfConductSeeder);
    this.codeOfConducts.seed(codeOfConduct);
  }

  seedOrganigram() {
    const organigram = new Organigram(organigramSeeder);
    this.organigrams.seed(organigram);
  }

  seedSchedule() {
    const schedules = scheduleSeeder.map((schedule) => new Schedule(schedule));
    this.schedules.seed(schedules);
  }

  seedAssistant() {
    const assistants = assistantSeeder.map(
      (assistant) => new Assistant(assistant),
    );
    this.assistants.seed(assistants);
  }
}
