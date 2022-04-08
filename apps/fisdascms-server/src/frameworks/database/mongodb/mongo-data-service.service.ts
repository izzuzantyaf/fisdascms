import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/entities/abstracts/data-services.abstract';
import { IDatabaseSeeder } from 'src/entities/abstracts/database-seeder.interface';
import { Admin, AdminDocument } from 'src/entities/models/admin.entity';
import { adminSeeder } from 'src/entities/seeders/admin.seeder';
import { AdminMongoRepository } from './admin-mongo-repo';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap, IDatabaseSeeder
{
  admins: AdminMongoRepository;

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  onApplicationBootstrap() {
    this.admins = new AdminMongoRepository(this.adminModel);
    this.seedAdmin();
  }

  async seedAdmin() {
    const admin = new Admin(adminSeeder);
    await admin.hashPassword();
    this.admins.createOrUpdate(admin);
  }
}
