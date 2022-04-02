import { IAdminGenericRepository } from 'src/core/abstracts/admin-repo.abstract';
import { Admin, AdminDocument } from 'src/core/entities/admin.entity';
import { MongoGenericRepository } from './mongo-generic-repo';
import { Model } from 'mongoose';

export class AdminMongoRepository
  extends MongoGenericRepository<Admin>
  implements IAdminGenericRepository
{
  constructor(repository: Model<AdminDocument>) {
    super(repository);
  }

  getByEmail(email: string): Promise<Admin> {
    return this._repository.findOne({ email: email }).exec();
  }

  deleteByEmail(email: string): Promise<Admin> {
    return this._repository.findOneAndDelete({ email: email }).exec();
  }
}
