import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../core/entities/admin.entity';
import {
  Assistant,
  AssistantDocument,
} from '../core/entities/assistant.entity';
import {
  CodeOfConduct,
  CodeOfConductDocument,
} from '../core/entities/code-of-conduct.entity';
import { Handout, HandoutDocument } from '../core/entities/handout.entity';
import {
  Organigram,
  OrganigramDocument,
} from '../core/entities/organigram.entity';
import {
  PracticumModule,
  PracticumModuleDocument,
} from '../core/entities/practicum-module.entity';
import { Schedule, ScheduleDocument } from '../core/entities/schedule.entity';
import { adminSeeder } from 'src/database/seeds/admin.seed';
import { assistantSeeder } from 'src/database/seeds/assistant.seed';
import { codeOfConductSeeder } from 'src/database/seeds/code-of-conduct.seed';
import { handoutSeeder } from 'src/database/seeds/handout.seed';
import { organigramSeeder } from 'src/database/seeds/organigram.seed';
import { practicumModuleSeeder } from 'src/database/seeds/practicum-module.seed';
import { scheduleSeeder } from 'src/database/seeds/schedule.seed';
import { AdminMongoRepository } from './repo/admin-mongo.repo';
import { AssistantMongoRepository } from './repo/assistant-mongo.repo';
import { CodeOfConductMongoRepository } from './repo/code-of-conduct-mongo.repo';
import { HandoutMongoRepository } from './repo/handout-mongo.repo';
import { OrganigramMongoRepository } from './repo/organigram-mongo.repo';
import { PracticumModuleMongoRepository } from './repo/practicum-module-mongo.repo';
import { ScheduleMongoRepository } from './repo/schedule-mongo.repo';

@Injectable()
export class DataServiceService {
  admins: AdminMongoRepository;
  handouts: HandoutMongoRepository;
  codeOfConducts: CodeOfConductMongoRepository;
  organigrams: OrganigramMongoRepository;
  schedules: ScheduleMongoRepository;
  assistants: AssistantMongoRepository;
  practicumModules: PracticumModuleMongoRepository;

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
    @InjectModel(PracticumModule.name)
    private practicumModuleModel: Model<PracticumModuleDocument>,
  ) {
    this.admins = new AdminMongoRepository(this.adminModel);
    this.handouts = new HandoutMongoRepository(this.handoutModel);
    this.codeOfConducts = new CodeOfConductMongoRepository(
      this.codeOfConductModel,
    );
    this.organigrams = new OrganigramMongoRepository(this.organigramModel);
    this.schedules = new ScheduleMongoRepository(this.scheduleModel);
    this.assistants = new AssistantMongoRepository(this.assistantModel);
    this.practicumModules = new PracticumModuleMongoRepository(
      this.practicumModuleModel,
    );
    this.seedAdmin();
    this.seedHandout();
    this.seedCodeOfConduct();
    this.seedOrganigram();
    this.seedSchedule();
    this.seedAssistant();
    this.seedPracticumModule();
  }

  protected async seedAdmin() {
    const admin = new Admin(adminSeeder);
    await admin.hashPassword();
    this.admins.seed(admin);
  }

  protected seedHandout() {
    const handouts = handoutSeeder.map(
      (handoutSeed) => new Handout(handoutSeed),
    );
    this.handouts.seed(handouts);
  }

  protected seedCodeOfConduct() {
    const codeOfConduct = new CodeOfConduct(codeOfConductSeeder);
    this.codeOfConducts.seed(codeOfConduct);
  }

  protected seedOrganigram() {
    const organigram = new Organigram(organigramSeeder);
    this.organigrams.seed(organigram);
  }

  protected seedSchedule() {
    const schedules = scheduleSeeder.map((schedule) => new Schedule(schedule));
    this.schedules.seed(schedules);
  }

  protected seedAssistant() {
    const assistants = assistantSeeder.map(
      (assistant) => new Assistant(assistant),
    );
    this.assistants.seed(assistants);
  }

  protected seedPracticumModule(): void {
    const practicumModules = practicumModuleSeeder.map(
      (practicumModule) => new PracticumModule(practicumModule),
    );
    this.practicumModules.seed(practicumModules);
  }
}
