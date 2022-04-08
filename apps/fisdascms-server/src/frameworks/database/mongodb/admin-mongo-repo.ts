import { IAdminGenericRepository } from 'src/entities/abstracts/admin-repo.interface';
import { Admin, AdminDocument } from 'src/entities/models/admin.entity';
import { MongoGenericRepository } from './mongo-generic-repo';
import { Model } from 'mongoose';

export class AdminMongoRepository
  extends MongoGenericRepository<Admin>
  implements IAdminGenericRepository
{
  constructor(repository: Model<AdminDocument>) {
    super(repository);
  }

  createOrUpdate(admin: Admin) {
    return this._repository.findOneAndUpdate({ email: admin.email }, admin, {
      new: true,
      upsert: true,
    });
  }

  getByEmail(email: string) {
    return this._repository.findOne({ email: email }).exec();
  }

  deleteByEmail(email: string) {
    return this._repository.findOneAndDelete({ email: email }).exec();
  }
}
