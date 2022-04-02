import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/core/abstracts/data-services.abstract';
import { Admin, AdminDocument } from 'src/core/entities/admin.entity';
import { AdminMongoRepository } from './admin-mongo-repo';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  admins: AdminMongoRepository;

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  onApplicationBootstrap() {
    this.admins = new AdminMongoRepository(this.adminModel);
  }
}
