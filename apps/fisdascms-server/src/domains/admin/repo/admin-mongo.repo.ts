import { Admin, AdminDocument } from '../entities/admin.entity';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';
import { MongoGenericRepository } from 'src/database/repo/mongo-generic.repo';

export class AdminMongoRepository extends MongoGenericRepository<Admin> {
  constructor(repository: Model<AdminDocument>) {
    super(repository);
  }

  async seed(admin: Admin) {
    const adminCollection = await this._repository.findOne().exec();
    if (isEmpty(adminCollection)) {
      this._repository.create(admin);
      console.log('Admin collection seeded successfuly');
    }
  }

  getByEmail(email: string) {
    return this._repository.findOne({ email: email }).exec();
  }

  deleteByEmail(email: string) {
    return this._repository.findOneAndDelete({ email: email }).exec();
  }
}
