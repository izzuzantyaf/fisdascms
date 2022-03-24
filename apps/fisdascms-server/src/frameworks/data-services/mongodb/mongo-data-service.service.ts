import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/core/abstracts/data-services.abstract';
import { MongoGenericRepository } from './mongo-generic-repo';
import { Admin, AdminDocument } from 'src/core/entities/admin.entity';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  admins: MongoGenericRepository<Admin>;

  constructor(
    @InjectModel(Admin.name)
    private AdminRepository: Model<AdminDocument>,
  ) {}

  onApplicationBootstrap() {
    this.admins = new MongoGenericRepository<Admin>(this.AdminRepository);
  }
}
