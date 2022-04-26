import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { IDatabaseSeeder } from 'src/entities/abstracts/database-seeder.interface';
import { Admin, AdminDocument } from 'src/entities/models/admin.entity';
import {
  CodeOfConduct,
  CodeOfConductDocument,
} from 'src/entities/models/code-of-conduct.entity';
import { Handout, HandoutDocument } from 'src/entities/models/handout.entity';
import {
  Organigram,
  OrganigramDocument,
} from 'src/entities/models/organigram.entity';
import { adminSeeder } from 'src/entities/seeders/admin.seeder';
import { codeOfConductSeeder } from 'src/entities/seeders/code-of-conduct.seeder';
import { handoutSeeder } from 'src/entities/seeders/handout.seeder';
import { organigramSeeder } from 'src/entities/seeders/organigram.seeder';
import { AdminMongoRepository } from './repo/admin-mongo-repo';
import { CodeOfConductMongoRepository } from './repo/code-of-conduct-mongo-repo';
import { HandoutMongoRepository } from './repo/handout-mongo-repo';
import { OrganigramMongoRepository } from './repo/organigram-mongo-repo';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap, IDatabaseSeeder
{
  admins: AdminMongoRepository;
  handouts: HandoutMongoRepository;
  codeOfConducts: CodeOfConductMongoRepository;
  organigrams: OrganigramMongoRepository;

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Handout.name) private handoutModel: Model<HandoutDocument>,
    @InjectModel(CodeOfConduct.name)
    private codeOfConductModel: Model<CodeOfConductDocument>,
    @InjectModel(Organigram.name)
    private organigramModel: Model<OrganigramDocument>,
  ) {}

  onApplicationBootstrap() {
    this.admins = new AdminMongoRepository(this.adminModel);
    this.handouts = new HandoutMongoRepository(this.handoutModel);
    this.codeOfConducts = new CodeOfConductMongoRepository(
      this.codeOfConductModel,
    );
    this.organigrams = new OrganigramMongoRepository(this.organigramModel);
    this.seedAdmin();
    this.seedHandout();
    this.seedCodeOfConduct();
    this.seedOrganigram();
  }

  async seedAdmin() {
    const admin = new Admin(adminSeeder);
    await admin.hashPassword();
    this.admins.seed(admin);
  }

  async seedHandout() {
    const handouts = handoutSeeder.map(
      (handoutSeed) => new Handout(handoutSeed),
    );
    this.handouts.seed(handouts);
  }

  async seedCodeOfConduct() {
    const codeOfConduct = new CodeOfConduct(codeOfConductSeeder);
    this.codeOfConducts.seed(codeOfConduct);
  }

  async seedOrganigram() {
    const organigram = new Organigram(organigramSeeder);
    this.organigrams.seed(organigram);
  }
}
