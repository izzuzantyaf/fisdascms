import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { IDatabaseSeeder } from 'src/entities/abstracts/database-seeder.interface';
import { Admin, AdminDocument } from 'src/entities/models/admin.entity';
import { Handout, HandoutDocument } from 'src/entities/models/handout.entity';
import { adminSeeder } from 'src/entities/seeders/admin.seeder';
import { handoutSeeder } from 'src/entities/seeders/handout.seeder';
import { AdminMongoRepository } from './admin-mongo-repo';
import { HandoutMongoRepository } from './handout-mongo-repo';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap, IDatabaseSeeder
{
  admins: AdminMongoRepository;
  handouts: HandoutMongoRepository;

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Handout.name) private handoutModel: Model<HandoutDocument>,
  ) {}

  onApplicationBootstrap() {
    this.admins = new AdminMongoRepository(this.adminModel);
    this.seedAdmin();
    this.handouts = new HandoutMongoRepository(this.handoutModel);
    this.seedHandout();
  }

  async seedAdmin() {
    const admin = new Admin(adminSeeder);
    await admin.hashPassword();
    this.admins.createOrUpdate(admin);
  }

  async seedHandout() {
    const handouts = handoutSeeder.map(
      (handoutSeed) => new Handout(handoutSeed),
    );
    this.handouts.createManyOrUpdate(handouts);
  }
}
